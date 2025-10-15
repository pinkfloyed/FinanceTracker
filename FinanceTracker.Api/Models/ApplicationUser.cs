using Microsoft.AspNetCore.Identity;

namespace FinanceTracker.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string DisplayName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string PreferredCurrency { get; set; } = "USD";
        public string PreferredLanguage { get; set; } = "en";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
