// DTOs/Finance/GoalDto.cs
using System.ComponentModel.DataAnnotations;

namespace FinanceTracker.Api.DTOs.Finance
{
    public class GoalDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = null!;

        [Required]
        public decimal TargetAmount { get; set; }

        public decimal CurrentAmount { get; set; } = 0;

        public DateTime TargetDate { get; set; } = DateTime.UtcNow.AddMonths(3);
    }
}
