using System.ComponentModel.DataAnnotations.Schema;

namespace StudentAutomationSystem.Models;

public class Course
{
    [Column("course_id")]
    public int CourseId { get; set; }

    [Column("course_name")]
    public string CourseName { get; set; }

    [Column("teacher_id")]
    public int TeacherId { get; set; }

    [Column("course_ongoing")]
    public bool CourseOngoing { get; set; }

    public Teacher? Teacher { get; set; }

    public ICollection<Grade>? Grades { get; set; }
}