// DTOs/Finance/ExpenseDto.cs
using System.ComponentModel.DataAnnotations;

namespace FinanceTracker.Api.DTOs.Finance
{
    public class ExpenseDto
    {
        [Required]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public IFormFile? ReceiptUrl { get; set; }
    }
}
