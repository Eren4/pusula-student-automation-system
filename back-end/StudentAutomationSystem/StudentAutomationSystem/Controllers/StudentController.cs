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
            .Include(student => student.Grades)
            .ThenInclude(grade => grade.Course)
            .Select(student => new StudentDTO
            {
                StudentId = student.StudentId,
                StudentName = student.StudentName,
                StudentSurname = student.StudentSurname,
                StudentEmail = student.StudentEmail,
                Grades = student.Grades.Select(grade => new GradeDTO
                {
                    CourseId = grade.CourseId,
                    CourseName = grade.Course.CourseName,

                    StudentId = student.StudentId,
                    StudentName = student.StudentName,
                    StudentSurname = student.StudentSurname,

                    StudentGrade = grade.StudentGrade,
                    StudentAbsence = grade.StudentAbsence,
                    StudentComment = grade.StudentComment
                }).ToList()
            })
            .ToListAsync();

        return students;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StudentDTO>> GetStudent(int id)
    {
        var student = await _context.Students
            .Include(student => student.Grades)
            .ThenInclude(grade => grade.Course)
            .Where(student => student.StudentId == id)
            .Select(student => new StudentDTO
            {
                StudentId = student.StudentId,
                StudentName = student.StudentName,
                StudentSurname = student.StudentSurname,
                StudentEmail = student.StudentEmail,
                Grades = student.Grades.Select(grade => new GradeDTO
                {
                    CourseId = grade.CourseId,
                    CourseName = grade.Course.CourseName,

                    StudentId = student.StudentId,
                    StudentName = student.StudentName,
                    StudentSurname = student.StudentSurname,

                    StudentGrade = grade.StudentGrade,
                    StudentAbsence = grade.StudentAbsence,
                    StudentComment = grade.StudentComment
                }).ToList()
            })
            .FirstOrDefaultAsync();

        if (student == null)
        {
            return NotFound("Student not found");
        }

        return student;
    }

    [HttpPost]
    public async Task<ActionResult<Student>> CreateStudent(Student student)
    {
        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, student);
    }
}