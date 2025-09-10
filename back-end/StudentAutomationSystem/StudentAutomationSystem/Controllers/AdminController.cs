using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAutomationSystem.Data;
using StudentAutomationSystem.Models;

namespace StudentAutomationSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GradeController : ControllerBase
{
    private readonly AppDbContext _context;

    public GradeController(AppDbContext context)
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

    public bool VerifyPassword(string enteredPassword, string storedHash)
    {
        // Encrypt enterd password and compare with stored hash
        string bcryptedPassword = BCrypt.Net.BCrypt.HashPassword(enteredPassword);

        return enteredPassword == bcryptedPassword;
    }
}