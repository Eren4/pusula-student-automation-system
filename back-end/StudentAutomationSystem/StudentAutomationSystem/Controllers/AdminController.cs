using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAutomationSystem.Data;
using StudentAutomationSystem.Models;

namespace StudentAutomationSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("login")]
    public async Task<ActionResult> Login([FromBody] LoginDTO loginDTO)
    {
        var admin = await _context.Admins
            .FirstOrDefaultAsync(a => a.AdminEmail == loginDTO.Email);

        if (admin == null || !VerifyPassword(loginDTO.Password, admin.AdminPassword))
        {
            return Unauthorized("Invalid credentials");
        }

        return Ok("Login successful.");
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] AdminRegisterDTO adminRegisterDTO)
    {
        var existingAdmin = await _context.Admins
            .FirstOrDefaultAsync(a => a.AdminEmail == adminRegisterDTO.Email);
        if (existingAdmin != null)
        {
            return Conflict("Admin with email " + adminRegisterDTO.Email + " already exists");
        }

        var newAdmin = new Admin
        {
            AdminNickname = adminRegisterDTO.Nickname,
            AdminEmail = adminRegisterDTO.Email,
            AdminPassword = BCrypt.Net.BCrypt.HashPassword(adminRegisterDTO.Password) // Hash the password before storing
        };

        _context.Admins.Add(newAdmin);
        await _context.SaveChangesAsync();

        return Ok("Admin registered successfully.");
    }

    public bool VerifyPassword(string enteredPassword, string storedHash)
    {
        // Encrypt enterd password and compare with stored hash
        string bcryptedPassword = BCrypt.Net.BCrypt.HashPassword(enteredPassword);

        return enteredPassword == bcryptedPassword;
    }
}