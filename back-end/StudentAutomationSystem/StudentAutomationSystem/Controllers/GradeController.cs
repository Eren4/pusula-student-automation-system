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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GradeDTO>>> GetGrades()
    {
        var grades = await _context.Grades
            .Include(g => g.Student)
            .Include(g => g.Course)
            .Select(g => new GradeDTO
            {
                CourseId = g.CourseId,
                CourseName = g.Course.CourseName,

                StudentId = g.StudentId,
                StudentName = g.Student.StudentName,
                StudentSurname = g.Student.StudentSurname,

                StudentGrade = g.StudentGrade,
                StudentComment = g.StudentComment,
                StudentAbsence = g.StudentAbsence
            }).ToListAsync();

        return grades;
    }

    [HttpPost]
    public async Task<IActionResult> PostGrade(Grade grade)
    {
        var student = await _context.Students.FindAsync(grade.StudentId);
        if (student == null)
        {
            return NotFound("Student with id " + grade.StudentId + " not found");
        }

        var course = await _context.Courses.FindAsync(grade.CourseId);
        if (course == null)
        {
            return NotFound("Course with id " + grade.CourseId + " not found");
        }

        var existingGrade = await _context.Grades
            .FirstOrDefaultAsync(g => g.StudentId == grade.StudentId && g.CourseId == grade.CourseId);
        if (existingGrade != null)
        {
            return Conflict("Grade for student id " + grade.StudentId + " in course id " + grade.CourseId + " already exists");
        }

        var createdGrade = new Grade
        {
            StudentId = grade.StudentId,
            CourseId = grade.CourseId,
            StudentGrade = grade.StudentGrade,
            StudentAbsence = grade.StudentAbsence,
            StudentComment = grade.StudentComment,
            Course = grade.Course,
            Student = grade.Student
        };

        _context.Grades.Add(createdGrade);
        await _context.SaveChangesAsync();

        return Ok("Grade added successfully.");
    }

    [HttpPut]
    public async Task<IActionResult> PutGrade(Grade grade)
    {
        var existingGrade = await _context.Grades
            .FirstOrDefaultAsync(g => g.StudentId == grade.StudentId && g.CourseId == grade.CourseId);

        if (existingGrade == null)
        {
            return NotFound("Grade for student id " + grade.StudentId + " in course id " + grade.CourseId + " not found");
        }

        existingGrade.StudentGrade = grade.StudentGrade;
        existingGrade.StudentAbsence = grade.StudentAbsence;
        existingGrade.StudentComment = grade.StudentComment;

        _context.Grades.Update(existingGrade);
        await _context.SaveChangesAsync();

        return Ok("Grade updated successfully.");
    }

    [HttpDelete("student/{studentId}/course/{courseId}")]
    public async Task<IActionResult> DeleteGrade(int studentId, int courseId)
    {
        var existingGrade = await _context.Grades
            .FirstOrDefaultAsync(g => g.StudentId == studentId && g.CourseId == courseId);

        if (existingGrade == null)
        {
            return NotFound("Grade for student id " + studentId + " in course id " + courseId + " not found");
        }

        _context.Grades.Remove(existingGrade);
        await _context.SaveChangesAsync();

        return Ok("Grade deleted successfully.");
    }
}