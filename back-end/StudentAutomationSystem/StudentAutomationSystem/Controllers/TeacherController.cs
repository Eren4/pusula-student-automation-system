using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAutomationSystem.Data;
using StudentAutomationSystem.Models;
using StudentAutomationSystem.DTOs;

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

    [HttpGet("{id}")]
    public async Task<ActionResult<TeacherDTO>> GetTeacher(int id)
    {
        var teacher = await _context.Teachers
            .Where(t => t.TeacherId == id)
            .Select(t => new TeacherDTO
            {
                TeacherId = t.TeacherId,
                TeacherName = t.TeacherName,
                TeacherSurname = t.TeacherSurname,
                TeacherEmail = t.TeacherEmail
            }).FirstOrDefaultAsync();

        if (teacher == null)
        {
            return NotFound("Teacher with id " + id + " not found");
        }

        return teacher;
    }

    // Get courses for a specific teacher
    [HttpGet("{id}/course")]
    public async Task<ActionResult<IEnumerable<CourseDTO>>> GetTeacherCourses(int id)
    {
        var teacher = await _context.Teachers.FindAsync(id);

        if (teacher == null)
        {
            return NotFound("Teacher with id " + id + " not found");
        }

        var courses = await _context.Courses
            .Where(c => c.TeacherId == id)
            .Select(c => new CourseDTO
            {
                CourseId = c.CourseId,
                CourseName = c.CourseName,
                TeacherId = c.TeacherId,
                TeacherName = c.Teacher.TeacherName,
                TeacherSurname = c.Teacher.TeacherSurname,
                CourseOngoing = c.CourseOngoing
            }).ToListAsync();

        return courses;
    }

    // Get the grades of the courses of that teacher
    [HttpGet("{id}/courses/grades")]
    public async Task<ActionResult<IEnumerable<GradeDTO>>> GetTeacherCourseGrades(int id)
    {
        var teacher = await _context.Teachers.FindAsync(id);

        if (teacher == null)
        {
            return NotFound("Teacher with id " + id + " not found");
        }

        var grades = await _context.Grades
            .Where(g => _context.Courses.Any(c => c.CourseId == g.CourseId && c.TeacherId == id))
            .Select(g => new GradeDTO
            {
                CourseId = g.CourseId,
                CourseName = g.Course.CourseName,

                StudentId = g.StudentId,
                StudentName = g.Student.StudentName,
                StudentSurname = g.Student.StudentSurname,

                StudentGrade = g.StudentGrade,
                StudentAbsence = g.StudentAbsence,
                StudentComment = g.StudentComment
            })
            .ToListAsync();

        return Ok(grades);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTeacher(Teacher teacher)
    {
        // Check if a teacher with the same email already exists
        List<Teacher> allTeachers = await _context.Teachers.ToListAsync();
        foreach (var t in allTeachers)
        {
            if (t.TeacherEmail == teacher.TeacherEmail)
            {
                return Conflict("Teacher with email " + teacher.TeacherEmail + " already exists");
            }
        }

        _context.Teachers.Add(teacher);
        await _context.SaveChangesAsync();

        return Ok("Teacher " + teacher.TeacherName + " " + teacher.TeacherSurname + " created successfully.");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Teacher>> DeleteTeacher(int id)
    {
        var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.TeacherId == id);
        if (teacher == null)
        {
            return NotFound("Teacher with id " + id + " not found");
        }

        // Check if the teacher has any courses assigned
        var hasCourses = await _context.Courses.AnyAsync(c => c.TeacherId == id);
        if (hasCourses)
        {
            Console.WriteLine("Basa");
            return Conflict("Cannot delete teacher with id " + id + " because they have courses assigned. Please reassign or delete the courses first.");
        }

        _context.Teachers.Remove(teacher);
        await _context.SaveChangesAsync();

        return Ok("Teacher with id " + id + " deleted successfully.");
    }
}