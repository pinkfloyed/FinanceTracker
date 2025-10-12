using FinanceTracker.Api.DTOs.Finance;
using FinanceTracker.Api.Models;

namespace FinanceTracker.Api.Services.Finance
{
    public interface IBudgetService
    {
        Task<Budget> CreateBudgetAsync(string userId, BudgetDto dto);
        Task<Budget?> GetBudgetByIdAsync(string userId, int id);
        Task<IEnumerable<Budget>> GetUserBudgetsAsync(string userId);
        Task<Budget?> UpdateBudgetAsync(string userId, int id, BudgetDto dto);
        Task<bool> DeleteBudgetAsync(string userId, int id);
    }
}
