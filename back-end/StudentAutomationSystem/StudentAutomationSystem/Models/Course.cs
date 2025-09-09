namespace StudentAutomationSystem.Models;

public class Course
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public int TeacherId { get; set; }
    public bool CourseOngoing { get; set; }

    public Teacher Teacher { get; set; }
}