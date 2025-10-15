// Services/Finance/GoalService.cs
using FinanceTracker.Api.Data;
using FinanceTracker.Api.DTOs.Finance;
using FinanceTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Api.Services.Finance
{
    public class GoalService : IGoalService
    {
        private readonly AppDbContext _db;
        public GoalService(AppDbContext db) { _db = db; }

        public async Task<Goal> CreateGoalAsync(string userId, GoalDto dto)
        {
            var goal = new Goal
            {
                UserId = userId,
                Title = dto.Title,
                TargetAmount = dto.TargetAmount,
                CurrentAmount = dto.CurrentAmount,
                TargetDate = dto.TargetDate
            };

            _db.Goals.Add(goal);
            await _db.SaveChangesAsync();
            return goal;
        }

        public async Task<bool> DeleteGoalAsync(string userId, int id)
        {
            var goal = await _db.Goals.FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
            if (goal == null) return false;

            _db.Goals.Remove(goal);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<Goal?> GetGoalByIdAsync(string userId, int id)
        {
            return await _db.Goals.FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
        }

        public async Task<IEnumerable<Goal>> GetUserGoalsAsync(string userId)
        {
            return await _db.Goals
                .Where(g => g.UserId == userId)
                .OrderBy(g => g.TargetDate)
                .ToListAsync();
        }

        public async Task<Goal?> UpdateGoalAsync(string userId, int id, GoalDto dto)
        {
            var goal = await _db.Goals.FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
            if (goal == null) return null;

            goal.Title = dto.Title;
            goal.TargetAmount = dto.TargetAmount;
            goal.CurrentAmount = dto.CurrentAmount;
            goal.TargetDate = dto.TargetDate;

            _db.Goals.Update(goal);
            await _db.SaveChangesAsync();
            return goal;
        }
    }
}
