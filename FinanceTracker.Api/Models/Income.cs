// Models/Income.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceTracker.Api.Models
{
    public class Income
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } = null!;
        [ForeignKey(nameof(UserId))]
        public ApplicationUser? User { get; set; }

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
