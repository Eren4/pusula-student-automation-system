using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAutomationSystem.Data;
using StudentAutomationSystem.Models;

namespace StudentAutomationSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TeacherController : ControllerBase
{
    private readonly AppDbContext _context;

    public TeacherController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TeacherDTO>>> GetTeachers()
    {
        var teachers = await _context.Teachers
            .Select(t => new TeacherDTO
            {
                TeacherId = t.TeacherId,
                TeacherName = t.TeacherName,
                TeacherSurname = t.TeacherSurname,
                TeacherEmail = t.TeacherEmail
            }).ToListAsync();

        return teachers;
    }
}