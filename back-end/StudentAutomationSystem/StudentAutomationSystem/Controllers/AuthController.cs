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
            UserDTO userDto = null;

            if (student != null)
            {
                hashedPassword = student.StudentPassword;
                role = "Student";
                userDto = new UserDTO
                {
                    Id = student.StudentId,
                    Name = student.StudentName,
                    Surname = student.StudentSurname,
                    Email = student.StudentEmail,
                    Role = role
                };
            }
            else if (teacher != null)
            {
                hashedPassword = teacher.TeacherPassword; // Adjust property name
                role = "Teacher";
                userDto = new UserDTO
                {
                    Id = teacher.TeacherId,
                    Name = teacher.TeacherName,
                    Surname = teacher.TeacherSurname,
                    Email = teacher.TeacherEmail,
                    Role = role
                };
            }
            else if (admin != null)
            {
                hashedPassword = admin.AdminPassword; // Adjust property name
                role = "Admin";
                userDto = new UserDTO
                {
                    Id = admin.AdminId,
                    Name = admin.AdminNickname,
                    Email = teacher.TeacherEmail,
                    Role = role
                };
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

            return Ok(userDto);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Login error: {ex.Message}\n{ex.StackTrace}");
            return StatusCode(500, "An error occurred during login.");
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterDTO registerDto)
    {
        if(string.IsNullOrEmpty(registerDto.Role))
        {
            return BadRequest("Role is required.");
        }

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

        switch (registerDto.Role.ToLower())
        {
            case "student":
                var student = new Student
                {
                    StudentName = registerDto.Name,
                    StudentSurname = registerDto.Surname,
                    StudentEmail = registerDto.Email,
                    StudentPassword = hashedPassword
                };
                _context.Students.Add(student);
                break;

            case "teacher":
                var teacher = new Teacher
                {
                    TeacherName = registerDto.Name,
                    TeacherSurname = registerDto.Surname,
                    TeacherEmail = registerDto.Email,
                    TeacherPassword = hashedPassword
                };
                _context.Teachers.Add(teacher);
                break;

            case "admin":
                var admin = new Admin
                {
                    AdminNickname = registerDto.Name,
                    AdminEmail = registerDto.Email,
                    AdminPassword = hashedPassword
                };
                _context.Admins.Add(admin);
                break;
                
            default:
                return BadRequest("Invalid role. Must be Student, Teacher, or Admin.");
        }
        try
        {
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Registration error: {ex.Message}\n{ex.StackTrace}");
            return StatusCode(500, "An error occurred during registration.");
        }
    }
}