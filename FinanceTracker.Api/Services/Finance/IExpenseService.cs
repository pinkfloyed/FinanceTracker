// Services/Finance/IExpenseService.cs
using FinanceTracker.Api.DTOs.Finance;
using FinanceTracker.Api.Models;

namespace FinanceTracker.Api.Services.Finance
{
    public interface IExpenseService
    {
        Task<Expense> CreateExpenseAsync(string userId, ExpenseDto dto);
        Task<IEnumerable<Expense>> GetUserExpensesAsync(string userId);
        Task<Expense?> GetExpenseByIdAsync(string userId, int id);
        Task<Expense?> UpdateExpenseAsync(string userId, int id, ExpenseDto dto);
        Task<bool> DeleteExpenseAsync(string userId, int id);
    }
}
