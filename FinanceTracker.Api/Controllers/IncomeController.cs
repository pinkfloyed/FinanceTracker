// Controllers/IncomeController.cs
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
    public class IncomeController : ControllerBase
    {
        private readonly IIncomeService _service;
        public IncomeController(IIncomeService service) { _service = service; }
        private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] IncomeDto dto)
        {
            var income = await _service.CreateIncomeAsync(UserId, dto);
            return Ok(income);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var incomes = await _service.GetUserIncomesAsync(UserId);
            return Ok(incomes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var income = await _service.GetIncomeByIdAsync(UserId, id);
            if (income == null) return NotFound();
            return Ok(income);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] IncomeDto dto)
        {
            var income = await _service.UpdateIncomeAsync(UserId, id, dto);
            if (income == null) return NotFound();
            return Ok(income);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteIncomeAsync(UserId, id);
            if (!result) return NotFound();
            return Ok(new { message = "Deleted successfully" });
        }
    }
}
