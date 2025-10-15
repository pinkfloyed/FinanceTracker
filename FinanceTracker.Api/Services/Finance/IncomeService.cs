// Services/Finance/IncomeService.cs
using FinanceTracker.Api.Data;
using FinanceTracker.Api.DTOs.Finance;
using FinanceTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Api.Services.Finance
{
    public class IncomeService : IIncomeService
    {
        private readonly AppDbContext _db;
        public IncomeService(AppDbContext db) { _db = db; }

        public async Task<Income> CreateIncomeAsync(string userId, IncomeDto dto)
        {
            var income = new Income
            {
                UserId = userId,
                Amount = dto.Amount,
                Source = dto.Source,
                Description = dto.Description,
                Date = dto.Date,
                IsRecurring = dto.IsRecurring,
                RecurrenceRule = dto.RecurrenceRule
            };
            _db.Incomes.Add(income);
            await _db.SaveChangesAsync();
            return income;
        }

        public async Task<bool> DeleteIncomeAsync(string userId, int id)
        {
            var income = await _db.Incomes.FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
            if (income == null) return false;
            _db.Incomes.Remove(income);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<Income?> GetIncomeByIdAsync(string userId, int id)
        {
            return await _db.Incomes.FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
        }

        public async Task<IEnumerable<Income>> GetUserIncomesAsync(string userId)
        {
            return await _db.Incomes
                .Where(i => i.UserId == userId)
                .OrderByDescending(i => i.Date)
                .ToListAsync();
        }

        public async Task<Income?> UpdateIncomeAsync(string userId, int id, IncomeDto dto)
        {
            var income = await _db.Incomes.FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
            if (income == null) return null;

            income.Amount = dto.Amount;
            income.Source = dto.Source;
            income.Description = dto.Description;
            income.Date = dto.Date;
            income.IsRecurring = dto.IsRecurring;
            income.RecurrenceRule = dto.RecurrenceRule;

            _db.Incomes.Update(income);
            await _db.SaveChangesAsync();
            return income;
        }
    }
}
