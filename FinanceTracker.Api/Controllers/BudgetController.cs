// Controllers/BudgetController.cs
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
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _service;
        public BudgetController(IBudgetService service) { _service = service; }
        private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpPost]
        public async Task<IActionResult> Create(BudgetDto dto)
        {
            var budget = await _service.CreateBudgetAsync(UserId, dto);
            return Ok(budget);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetUserBudgetsAsync(UserId));

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var budget = await _service.GetBudgetByIdAsync(UserId, id);
            if (budget == null) return NotFound();
            return Ok(budget);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, BudgetDto dto)
        {
            var budget = await _service.UpdateBudgetAsync(UserId, id, dto);
            if (budget == null) return NotFound();
            return Ok(budget);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteBudgetAsync(UserId, id);
            if (!result) return NotFound();
            return Ok(new { message = "Deleted successfully" });
        }
    }
}
