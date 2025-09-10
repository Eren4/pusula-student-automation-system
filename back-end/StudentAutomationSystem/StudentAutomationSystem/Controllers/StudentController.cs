using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAutomationSystem.Data;
using StudentAutomationSystem.Models;

namespace StudentAutomationSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentController : ControllerBase
{
    private readonly AppDbContext _context;

    public StudentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentDTO>>> GetStudents()
    {
        var students = await _context.Students
            .Select(s => new StudentDTO
            {
                StudentId = s.StudentId,
                StudentName = s.StudentName,
                StudentSurname = s.StudentSurname,
                StudentEmail = s.StudentEmail
            }).ToListAsync();

        return students;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StudentDTO>> GetStudent(int id)
    {
        var student = await _context.Students
            .Where(s => s.StudentId == id)
            .Select(s => new StudentDTO
            {
                StudentId = s.StudentId,
                StudentName = s.StudentName,
                StudentSurname = s.StudentSurname,
                StudentEmail = s.StudentEmail
            }).FirstOrDefaultAsync();

        if (student == null)
        {
            return NotFound("Student with id " + id + " not found");
        }

        return student;
    }

    // Get grades for a specific student
    [HttpGet("{id}/grades")]
    public async Task<ActionResult<IEnumerable<GradeDTO>>> GetStudentGrades(int id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
        {
            return NotFound("Student with id " + id + " not found");
        }

        var grades = await _context.Grades
            .Where(g => g.StudentId == id)
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
            }).ToListAsync();

        return grades;
    }

    [HttpPost]
    public async Task<IActionResult> CreateStudent(Student student)
    {
        List<Student> allStudents = await _context.Students.ToListAsync();
        foreach (var s in allStudents)
        {
            if (s.StudentEmail == student.StudentEmail)
            {
                return Conflict("Student with email " + student.StudentEmail + " already exists");
            }
        }

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return Ok("Student " + student.StudentName + " " + student.StudentSurname + " created successfully.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var student = await _context.Students
            .Include(s => s.Grades) // Include related grades
            .FirstOrDefaultAsync(s => s.StudentId == id);

        if (student == null)
        {
            return NotFound("Student with id " + id + " not found");
        }

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();

        return Ok("Student with id " + id + " deleted successfully.");
    }
}