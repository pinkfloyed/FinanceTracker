// Data/AppDbContext.cs
using FinanceTracker.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Api.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; } = null!;
        public DbSet<Income> Incomes { get; set; } = null!;
        public DbSet<Budget> Budgets { get; set; } = null!;
        public DbSet<Goal> Goals { get; set; } = null!;
        public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Expense>().HasIndex(e => new { e.UserId, e.Date });
            builder.Entity<Income>().HasIndex(i => new { i.UserId, i.Date });
            builder.Entity<Budget>().HasIndex(b => new { b.UserId, b.PeriodStart, b.PeriodEnd });
            builder.Entity<Goal>().HasIndex(g => new { g.UserId });
        }
    }
}
