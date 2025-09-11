using System.ComponentModel.DataAnnotations.Schema;

namespace StudentAutomationSystem.Models;

public class Teacher
{
    [Column("teacher_id")]
    public int TeacherId { get; set; }

    [Column("teacher_name")]
    public string TeacherName { get; set; }

    [Column("teacher_surname")]
    public string TeacherSurname { get; set; }

    [Column("teacher_email")]
    public string? TeacherEmail { get; set; }

    [Column("teacher_password")]
    public string TeacherPassword { get; set; }

    public ICollection<Course>? Courses { get; set; }
}