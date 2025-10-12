// Models/Budget.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceTracker.Api.Models
{
    public class Budget
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } = null!;
        [ForeignKey(nameof(UserId))]
        public ApplicationUser? User { get; set; }

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = null!;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime PeriodStart { get; set; }

        [Required]
        public DateTime PeriodEnd { get; set; }
        public decimal Limit { get; set; }
        public string Period { get; set; } = "Monthly";
        public DateTime StartDate { get; set; }
    }
}
