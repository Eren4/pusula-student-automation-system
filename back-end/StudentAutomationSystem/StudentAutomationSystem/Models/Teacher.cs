public class Student
{
    public int TeacherId { get; set; }
    public string TeacherName { get; set; }
    public string TeacherSurname { get; set; }
    public string TeacherEmail { get; set; }
    public string TeacherPassword { get; set; }

    public ICollection<Course> Courses { get; set; }
}