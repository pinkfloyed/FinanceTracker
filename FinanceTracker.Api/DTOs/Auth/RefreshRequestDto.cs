using System.ComponentModel.DataAnnotations;

namespace FinanceTracker.Api.DTOs.Auth
{
    public class RefreshRequestDto
    {
        [Required]
        public string RefreshToken { get; set; } = string.Empty;
    }
}
