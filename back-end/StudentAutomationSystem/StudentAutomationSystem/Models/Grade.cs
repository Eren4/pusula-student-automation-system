using System.ComponentModel.DataAnnotations.Schema;

namespace StudentAutomationSystem.Models;

public class Grade
{

    [Column("course_id")]
    public int CourseId { get; set; }

    [Column("student_id")]
    public int StudentId { get; set; }

    [Column("student_grade")]
    public double? StudentGrade { get; set; }

    [Column("student_absence")]
    public int? StudentAbsence { get; set; }

    [Column("student_comment")]
    public string? StudentComment { get; set; }

    public Course? Course { get; set; }
    public Student? Student { get; set; }
}