using Microsoft.EntityFrameworkCore;
using StudentAutomationSystem.Models;

namespace StudentAutomationSystem.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Admin> Admins { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Grade> Grades { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Match the names of the tables in the database
        modelBuilder.Entity<Student>().ToTable("student");
        modelBuilder.Entity<Teacher>().ToTable("teacher");
        modelBuilder.Entity<Admin>().ToTable("admin");
        modelBuilder.Entity<Course>().ToTable("course");
        modelBuilder.Entity<Grade>().ToTable("grade");

        // Grade has composite key
        modelBuilder.Entity<Grade>()
            .HasKey(g => new { g.CourseId, g.StudentId });

        // Grade many-to-one with Student
        modelBuilder.Entity<Grade>()
            .HasOne(g => g.Student)
            .WithMany(s => s.Grades)
            .HasForeignKey(g => g.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Grade many-to-one with Course
        modelBuilder.Entity<Grade>()
            .HasOne(g => g.Course)
            .WithMany(c => c.Grades)
            .HasForeignKey(g => g.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        // Course one-to-many with Teacher
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Teacher)
            .WithMany(t => t.Courses)
            .HasForeignKey(c => c.TeacherId)
            .OnDelete(DeleteBehavior.Restrict); // Delete the courses first, then the teacher
    }

}