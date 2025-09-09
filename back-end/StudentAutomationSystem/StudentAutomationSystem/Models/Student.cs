using System.ComponentModel.DataAnnotations.Schema;

namespace StudentAutomationSystem.Models;

public class Student
{
    [Column("student_id")]
    public int StudentId { get; set; }

    [Column("student_name")]
    public string StudentName { get; set; }

    [Column("student_surname")]
    public string StudentSurname { get; set; }

    [Column("student_email")]
    public string StudentEmail { get; set; }

    [Column("student_password")]
    public string StudentPassword { get; set; }

    public ICollection<Grade> Grades { get; set; }
}