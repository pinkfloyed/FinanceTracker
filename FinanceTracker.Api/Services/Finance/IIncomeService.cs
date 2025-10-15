// Services/Finance/IIncomeService.cs
using FinanceTracker.Api.DTOs.Finance;
using FinanceTracker.Api.Models;

namespace FinanceTracker.Api.Services.Finance
{
    public interface IIncomeService
    {
        Task<Income> CreateIncomeAsync(string userId, IncomeDto dto);
        Task<IEnumerable<Income>> GetUserIncomesAsync(string userId);
        Task<Income?> GetIncomeByIdAsync(string userId, int id);
        Task<Income?> UpdateIncomeAsync(string userId, int id, IncomeDto dto);
        Task<bool> DeleteIncomeAsync(string userId, int id);
    }
}
