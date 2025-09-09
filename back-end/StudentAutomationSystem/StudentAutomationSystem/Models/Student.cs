namespace StudentAutomationSystem.Models;

public class Student
{
    public int StudentId { get; set; }
    public string StudentName { get; set; }
    public string StudentSurname { get; set; }
    public string StudentEmail { get; set; }
    public string StudentPassword { get; set; }

    public ICollection<Grade> Grades { get; set; }
}