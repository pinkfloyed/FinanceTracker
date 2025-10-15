// Controllers/AuthController.cs
using FinanceTracker.Api.DTOs.Auth;
using FinanceTracker.Api.Models;
using FinanceTracker.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FinanceTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AuthController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var exists = await _userManager.FindByEmailAsync(dto.Email);
            if (exists != null)
                return BadRequest(new { message = "Email already registered." });

            var user = new ApplicationUser
            {
                UserName = dto.UserName,
                Email = dto.Email,
                DisplayName = dto.UserName,
                Gender = dto.Gender,
                PreferredCurrency = dto.PreferredCurrency,
                PreferredLanguage = dto.PreferredLanguage
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // Assign role "USER"
            await _userManager.AddToRoleAsync(user, "USER").ConfigureAwait(false);

            // Generate tokens
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var (accessToken, accessExpiry, refreshToken, refreshExpiry) = await _tokenService.GenerateTokensAsync(user, ip);

            var response = new AuthResponseDto
            {
                AccessToken = accessToken,
                AccessTokenExpiresAt = accessExpiry,
                RefreshToken = refreshToken,
                RefreshTokenExpiresAt = refreshExpiry,
                UserId = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName
            };
            SetRefreshTokenCookie(refreshToken, refreshExpiry);

            return Ok(response);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return Unauthorized(new { message = "Invalid credentials." });

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, lockoutOnFailure: false);
            if (!result.Succeeded)
                return Unauthorized(new { message = "Invalid credentials." });

            var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var (accessToken, accessExpiry, refreshToken, refreshExpiry) = await _tokenService.GenerateTokensAsync(user, ip);

            var response = new AuthResponseDto
            {
                AccessToken = accessToken,
                AccessTokenExpiresAt = accessExpiry,
                RefreshToken = refreshToken,
                RefreshTokenExpiresAt = refreshExpiry,
                UserId = user.Id,
                Email = user.Email!,
                DisplayName = user.DisplayName
            };

            SetRefreshTokenCookie(refreshToken, refreshExpiry);

            return Ok(response);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.RefreshToken))
                return BadRequest(new { message = "Refresh token required." });

            var stored = await _tokenService.GetRefreshTokenAsync(dto.RefreshToken);
            if (stored == null || !stored.IsActive)
                return Unauthorized(new { message = "Invalid refresh token." });

            var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            await _tokenService.RevokeRefreshTokenAsync(stored, ip);

            var user = stored.User!;
            var (accessToken, accessExpiry, refreshToken, refreshExpiry) = await _tokenService.GenerateTokensAsync(user, ip);

            SetRefreshTokenCookie(refreshToken, refreshExpiry);

            return Ok(new AuthResponseDto
            {
                AccessToken = accessToken,
                AccessTokenExpiresAt = accessExpiry,
                RefreshToken = refreshToken,
                RefreshTokenExpiresAt = refreshExpiry,
                UserId = user.Id,
                Email = user.Email!,
                DisplayName = user.DisplayName
            });
        }

        [Authorize]
        [HttpPost("revoke")]
        public async Task<IActionResult> Revoke([FromBody] RefreshRequestDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.RefreshToken))
                return BadRequest(new { message = "Refresh token required." });

            var stored = await _tokenService.GetRefreshTokenAsync(dto.RefreshToken);
            if (stored == null)
                return NotFound(new { message = "Refresh token not found." });

            if (!stored.IsActive)
                return BadRequest(new { message = "Refresh token already revoked/expired." });

            var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            await _tokenService.RevokeRefreshTokenAsync(stored, ip);
            // Also clear cookie
            Response.Cookies.Delete("refreshToken");

            return Ok(new { message = "Refresh token revoked." });
        }

        private void SetRefreshTokenCookie(string refreshToken, DateTime expires)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = expires,
                SameSite = SameSiteMode.Strict,
                Secure = true
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("refreshToken");
            return Ok(new { message = "Logged out successfully." });
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> Profile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound();

            return Ok(new
            {
                id = user.Id,
                displayName = user.DisplayName,
                email = user.Email,
                gender = user.Gender,
                preferredCurrency = user.PreferredCurrency,
                preferredLanguage = user.PreferredLanguage
            });
        }


        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            user.DisplayName = dto.DisplayName ?? user.DisplayName;
            user.Email = dto.Email ?? user.Email;
            user.Gender = dto.Gender ?? user.Gender;
            user.PreferredCurrency = dto.PreferredCurrency ?? user.PreferredCurrency;
            user.PreferredLanguage = dto.PreferredLanguage ?? user.PreferredLanguage;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "Profile updated successfully!" });
        }

        [Authorize]
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "Password changed successfully!" });
        }

    }
}
