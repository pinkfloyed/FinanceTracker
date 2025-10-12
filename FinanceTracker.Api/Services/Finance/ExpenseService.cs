// Services/Finance/ExpenseService.cs
using FinanceTracker.Api.Data;
using FinanceTracker.Api.DTOs.Finance;
using FinanceTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Api.Services.Finance
{
    public class ExpenseService : IExpenseService
    {
        private readonly AppDbContext _db;
        private readonly IWebHostEnvironment _env;

        public ExpenseService(AppDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        public async Task<Expense> CreateExpenseAsync(string userId, ExpenseDto dto)
        {
            string? receiptUrl = null;
            if (dto.ReceiptUrl != null)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "receipts");
                if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}_{dto.ReceiptUrl.FileName}";
                var filePath = Path.Combine(uploadsFolder, fileName);
                await using var stream = new FileStream(filePath, FileMode.Create);
                await dto.ReceiptUrl.CopyToAsync(stream);

                receiptUrl = $"/receipts/{fileName}";
            }

            var expense = new Expense
            {
                UserId = userId,
                Amount = dto.Amount,
                Category = dto.Category,
                Description = dto.Description,
                Date = dto.Date,
                ReceiptUrl = receiptUrl
            };

            _db.Expenses.Add(expense);
            await _db.SaveChangesAsync();
            return expense;
        }

        public async Task<bool> DeleteExpenseAsync(string userId, int id)
        {
            var expense = await _db.Expenses.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
            if (expense == null) return false;

            // Delete file if exists
            if (!string.IsNullOrEmpty(expense.ReceiptUrl))
            {
                var filePath = Path.Combine(_env.WebRootPath ?? "wwwroot", expense.ReceiptUrl.TrimStart('/'));
                if (File.Exists(filePath)) File.Delete(filePath);
            }

            _db.Expenses.Remove(expense);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<Expense?> GetExpenseByIdAsync(string userId, int id)
        {
            return await _db.Expenses.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
        }

        public async Task<IEnumerable<Expense>> GetUserExpensesAsync(string userId)
        {
            return await _db.Expenses
                .Where(e => e.UserId == userId)
                .OrderByDescending(e => e.Date)
                .ToListAsync();
        }

        public async Task<Expense?> UpdateExpenseAsync(string userId, int id, ExpenseDto dto)
        {
            var expense = await _db.Expenses.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
            if (expense == null) return null;

            expense.Amount = dto.Amount;
            expense.Category = dto.Category;
            expense.Description = dto.Description;
            expense.Date = dto.Date;

            if (dto.ReceiptUrl != null)
            {

                if (!string.IsNullOrEmpty(expense.ReceiptUrl))
                {
                    var oldPath = Path.Combine(_env.WebRootPath ?? "wwwroot", expense.ReceiptUrl.TrimStart('/'));
                    if (File.Exists(oldPath)) File.Delete(oldPath);
                }

                var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "receipts");
                if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}_{dto.ReceiptUrl.FileName}";
                var filePath = Path.Combine(uploadsFolder, fileName);
                await using var stream = new FileStream(filePath, FileMode.Create);
                await dto.ReceiptUrl.CopyToAsync(stream);

                expense.ReceiptUrl = $"/receipts/{fileName}";
            }

            _db.Expenses.Update(expense);
            await _db.SaveChangesAsync();
            return expense;
        }
    }
}
