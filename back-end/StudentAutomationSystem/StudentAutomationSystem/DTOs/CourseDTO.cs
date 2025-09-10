namespace StudentAutomationSystem.DTOs;

public class CourseDTO
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public int TeacherId { get; set; }
    public string TeacherName { get; set; }
    public string TeacherSurname { get; set; }
    public bool CourseOngoing { get; set; }
}