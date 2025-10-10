// Controllers/DashboardController.cs
using FinanceTracker.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FinanceTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _db;
        public DashboardController(AppDbContext db) { _db = db; }
        private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var expenses = await _db.Expenses
                .Where(e => e.UserId == UserId)
                .ToListAsync();

            var incomes = await _db.Incomes
                .Where(i => i.UserId == UserId)
                .ToListAsync();

            var budgets = await _db.Budgets
                .Where(b => b.UserId == UserId)
                .ToListAsync();

            var goals = await _db.Goals
                .Where(g => g.UserId == UserId)
                .ToListAsync();

            var totalExpenses = expenses.Sum(e => e.Amount);
            var totalIncome = incomes.Sum(i => i.Amount);

            var result = new
            {
                totalExpenses,
                totalIncome,
                netBalance = totalIncome - totalExpenses,
                expensesByCategory = expenses
                    .GroupBy(e => e.Category)
                    .Select(g => new { Category = g.Key, Amount = g.Sum(e => e.Amount) }),
                top5Expenses = expenses.OrderByDescending(e => e.Amount).Take(5),
                budgets,
                goals
            };

            return Ok(result);
        }
    }
}
