// Services/ITokenService.cs
using FinanceTracker.Api.Models;

namespace FinanceTracker.Api.Services
{
    public interface ITokenService
    {
        Task<(string accessToken, DateTime accessTokenExpiry, string refreshToken, DateTime refreshTokenExpiry)> GenerateTokensAsync(ApplicationUser user, string ipAddress = null!);
        Task<RefreshToken?> GetRefreshTokenAsync(string token);
        Task RevokeRefreshTokenAsync(RefreshToken token, string revokedByIp);
        Task AddRefreshTokenAsync(RefreshToken token);
    }
}
