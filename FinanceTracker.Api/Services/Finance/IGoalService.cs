// Services/Finance/IGoalService.cs
using FinanceTracker.Api.DTOs.Finance;
using FinanceTracker.Api.Models;

namespace FinanceTracker.Api.Services.Finance
{
    public interface IGoalService
    {
        Task<Goal> CreateGoalAsync(string userId, GoalDto dto);
        Task<IEnumerable<Goal>> GetUserGoalsAsync(string userId);
        Task<Goal?> GetGoalByIdAsync(string userId, int id);
        Task<Goal?> UpdateGoalAsync(string userId, int id, GoalDto dto);
        Task<bool> DeleteGoalAsync(string userId, int id);
    }
}
