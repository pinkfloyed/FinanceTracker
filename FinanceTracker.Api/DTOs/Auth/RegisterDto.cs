using System.ComponentModel.DataAnnotations;

namespace FinanceTracker.Api.DTOs.Auth
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(8)]
        public string Password { get; set; } = string.Empty;

        [Required, Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        public string Gender { get; set; } = string.Empty;

        [Required]
        public string PreferredCurrency { get; set; } = "USD";

        [Required]
        public string PreferredLanguage { get; set; } = "en";
    }
}
