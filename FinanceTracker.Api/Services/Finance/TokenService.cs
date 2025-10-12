// Services/TokenService.cs
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FinanceTracker.Api.Config;
using FinanceTracker.Api.Data;
using FinanceTracker.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;


namespace FinanceTracker.Api.Services
{
    public class TokenService : ITokenService
    {
        private readonly AppDbContext _db;
        private readonly JwtSettings _settings;

        public TokenService(AppDbContext db, IOptions<JwtSettings> jwtOptions)
        {
            _db = db;
            _settings = jwtOptions.Value;
        }

        public async Task AddRefreshTokenAsync(RefreshToken token)
        {
            _db.RefreshTokens.Add(token);
            await _db.SaveChangesAsync();
        }

        public async Task<RefreshToken?> GetRefreshTokenAsync(string token)
        {
            return await _db.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(t => t.Token == token);
        }

        public async Task RevokeRefreshTokenAsync(RefreshToken token, string revokedByIp)
        {
            token.IsRevoked = true;
            token.RevokedAt = DateTime.UtcNow;
            token.RevokedByIp = revokedByIp;
            _db.RefreshTokens.Update(token);
            await _db.SaveChangesAsync();
        }


        public async Task<(string accessToken, DateTime accessTokenExpiry, string refreshToken, DateTime refreshTokenExpiry)> GenerateTokensAsync(ApplicationUser user, string ipAddress = null!)
        {
            // Access token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_settings.Secret);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new Claim("displayName", user.DisplayName ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_settings.AccessTokenExpirationMinutes),
                Issuer = _settings.Issuer,
                Audience = _settings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(securityToken);
            var accessExpiry = tokenDescriptor.Expires ?? DateTime.UtcNow.AddMinutes(_settings.AccessTokenExpirationMinutes);

            // Refresh token
            var refreshTokenValue = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
            var refreshExpiry = DateTime.UtcNow.AddDays(_settings.RefreshTokenExpirationDays);

            var refreshToken = new RefreshToken
            {
                Token = refreshTokenValue,
                UserId = user.Id,
                ExpiresAt = refreshExpiry,
                CreatedAt = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };

            await AddRefreshTokenAsync(refreshToken);

            return (accessToken, accessExpiry, refreshTokenValue, refreshExpiry);
        }
    }
}
