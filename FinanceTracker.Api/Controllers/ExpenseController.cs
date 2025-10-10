using FinanceTracker.Api.DTOs.Finance;
using FinanceTracker.Api.Services.Finance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FinanceTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ExpenseDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var expense = await _expenseService.CreateExpenseAsync(userId, dto);
            return Ok(expense);
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var expenses = await _expenseService.GetUserExpensesAsync(userId);
            return Ok(expenses);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var expense = await _expenseService.GetExpenseByIdAsync(userId, id);
            if (expense == null) return NotFound();

            return Ok(expense);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] ExpenseDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var updated = await _expenseService.UpdateExpenseAsync(userId, id, dto);
            if (updated == null) return NotFound();

            return Ok(updated);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var deleted = await _expenseService.DeleteExpenseAsync(userId, id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}
