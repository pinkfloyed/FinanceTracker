// Controllers/GoalController.cs
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
    public class GoalController : ControllerBase
    {
        private readonly IGoalService _service;
        public GoalController(IGoalService service) { _service = service; }
        private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpPost]
        public async Task<IActionResult> Create(GoalDto dto)
        {
            var goal = await _service.CreateGoalAsync(UserId, dto);
            return Ok(goal);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetUserGoalsAsync(UserId));

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var goal = await _service.GetGoalByIdAsync(UserId, id);
            if (goal == null) return NotFound();
            return Ok(goal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, GoalDto dto)
        {
            var goal = await _service.UpdateGoalAsync(UserId, id, dto);
            if (goal == null) return NotFound();
            return Ok(goal);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteGoalAsync(UserId, id);
            if (!result) return NotFound();
            return Ok(new { message = "Deleted successfully" });
        }
    }
}
