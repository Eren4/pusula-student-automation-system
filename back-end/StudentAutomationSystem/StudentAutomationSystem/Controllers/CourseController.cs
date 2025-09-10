using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAutomationSystem.Data;
using StudentAutomationSystem.Models;
using StudentAutomationSystem.DTOs;

namespace StudentAutomationSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly AppDbContext _context;

    public CourseController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CourseDTO>>> GetCourses()
    {
        var courses = await _context.Courses
            .Include(c => c.Teacher)
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

    [HttpGet("{id}")]
    public async Task<ActionResult<CourseDTO>> GetCourse(int id)
    {
        var course = await _context.Courses
            .Include(c => c.Teacher)
            .Where(c => c.CourseId == id)
            .Select(c => new CourseDTO
            {
                CourseId = c.CourseId,
                CourseName = c.CourseName,
                TeacherId = c.TeacherId,
                TeacherName = c.Teacher.TeacherName,
                TeacherSurname = c.Teacher.TeacherSurname,
                CourseOngoing = c.CourseOngoing
            }).FirstOrDefaultAsync();

        if (course == null)
        {
            return NotFound("Course with id " + id + " not found");
        }

        return course;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse(Course course)
    {
        // Check if course with that name already exists
        List<Course> allCourses = await _context.Courses.ToListAsync();
        foreach (var c in allCourses)
        {
            if (c.CourseName == course.CourseName)
            {
                return Conflict("Course with name " + course.CourseName + " already exists");
            }
        }

        var courseTeacher = await _context.Teachers.FindAsync(course.TeacherId);
        course.Teacher = courseTeacher;

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        return Ok("Course with name " + course.CourseName + " created successfully.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, Course updatedCourse)
    {
        var existingCourse = await _context.Courses.FindAsync(id);
        if (existingCourse == null)
        {
            return NotFound("Course with id " + id + " not found");
        }

        // Check if teacher exists
        var teacher = await _context.Teachers.FindAsync(updatedCourse.TeacherId);
        if (teacher == null)
        {
            return NotFound("Teacher with id " + updatedCourse.TeacherId + " not found");
        }

        existingCourse.CourseName = updatedCourse.CourseName;
        existingCourse.TeacherId = updatedCourse.TeacherId;
        existingCourse.CourseOngoing = updatedCourse.CourseOngoing;

        _context.Entry(existingCourse).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok("Course with id " + id + " modified successfully.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var course = await _context.Courses
            .Include(c => c.Teacher)
            .Include(c => c.Grades)
            .FirstOrDefaultAsync(c => c.CourseId == id);

        if (course == null)
        {
            return NotFound("Course with id " + id + " not found");
        }

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();

        return Ok("Course with id " + id + " deleted successfully");
    }
}