using AutomobileGallery.Model;
using Microsoft.EntityFrameworkCore;

namespace AutomobileGallery.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Car>()
            .Property(c => c.CarId)
            .HasDefaultValueSql("NEWID()");
    }

    public required DbSet<Car> Cars { get; set; }
}
