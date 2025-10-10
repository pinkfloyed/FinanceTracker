// DTOs/Finance/BudgetDto.cs
using System.ComponentModel.DataAnnotations;

namespace FinanceTracker.Api.DTOs.Finance
{
    public class BudgetDto
    {
        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = null!;

        [Required]
        public decimal Limit { get; set; }

        public string Period { get; set; } = "Monthly";

        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}
