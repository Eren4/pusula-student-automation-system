using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAutomationSystem.Data;
using StudentAutomationSystem.Models;
using StudentAutomationSystem.DTOs;
using BCrypt.Net;

namespace StudentAutomationSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginDTO loginDto)
    {
        try
        {
            var student = await _context.Students.AsNoTracking()
                .FirstOrDefaultAsync(s => s.StudentEmail == loginDto.Email);

            var teacher = await _context.Teachers.AsNoTracking()
                .FirstOrDefaultAsync(t => t.TeacherEmail == loginDto.Email);

            var admin = await _context.Admins.AsNoTracking()
                .FirstOrDefaultAsync(a => a.AdminEmail == loginDto.Email);

            string? hashedPassword = null;
            string? role = null;

            if (student != null)
            {
                hashedPassword = student.StudentPassword;
                role = "Student";
            }
            else if (teacher != null)
            {
                hashedPassword = teacher.TeacherPassword; // Adjust property name
                role = "Teacher";
            }
            else if (admin != null)
            {
                hashedPassword = admin.AdminPassword; // Adjust property name
                role = "Admin";
            }
            else
            {
                return Unauthorized("Invalid email or password.");
            }

            // Verify the password using BCrypt
            if(!BCrypt.Net.BCrypt.Verify(loginDto.Password, hashedPassword))
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { role });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Login error: {ex.Message}\n{ex.StackTrace}");
            return StatusCode(500, "An error occurred during login.");
        }
    }
}