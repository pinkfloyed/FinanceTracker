// Services/Finance/BudgetService.cs
using FinanceTracker.Api.Data;
using FinanceTracker.Api.DTOs.Finance;
using FinanceTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Api.Services.Finance
{
    public class BudgetService : IBudgetService
    {
        private readonly AppDbContext _db;

        public BudgetService(AppDbContext db) { _db = db; }

        public async Task<Budget> CreateBudgetAsync(string userId, BudgetDto dto)
        {
            var budget = new Budget
            {
                UserId = userId,
                Category = dto.Category,
                Limit = dto.Limit,
                Period = dto.Period,
                StartDate = dto.StartDate
            };

            _db.Budgets.Add(budget);
            await _db.SaveChangesAsync();
            return budget;
        }

        public async Task<bool> DeleteBudgetAsync(string userId, int id)
        {
            var budget = await _db.Budgets.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
            if (budget == null) return false;

            _db.Budgets.Remove(budget);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<Budget?> GetBudgetByIdAsync(string userId, int id)
        {
            return await _db.Budgets.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
        }

        public async Task<IEnumerable<Budget>> GetUserBudgetsAsync(string userId)
        {
            return await _db.Budgets
                .Where(b => b.UserId == userId)
                .OrderBy(b => b.StartDate)
                .ToListAsync();
        }

        public async Task<Budget?> UpdateBudgetAsync(string userId, int id, BudgetDto dto)
        {
            var budget = await _db.Budgets.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
            if (budget == null) return null;

            budget.Category = dto.Category;
            budget.Limit = dto.Limit;
            budget.Period = dto.Period;
            budget.StartDate = dto.StartDate;

            _db.Budgets.Update(budget);
            await _db.SaveChangesAsync();
            return budget;
        }
    }
}
