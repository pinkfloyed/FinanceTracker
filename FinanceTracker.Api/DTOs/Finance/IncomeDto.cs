// DTOs/Finance/IncomeDto.cs
using System.ComponentModel.DataAnnotations;

namespace FinanceTracker.Api.DTOs.Finance
{
    public class IncomeDto
    {
        [Required]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(100)]
        public string Source { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public bool IsRecurring { get; set; } = false;
        public string? RecurrenceRule { get; set; }
    }
}
