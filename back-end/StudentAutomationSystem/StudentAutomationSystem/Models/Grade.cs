public class Grade
{
    public int CourseId { get; set; }
    public int StudentId { get; set; }
    public double StudentGrade { get; set; }
    public int StudentAbsence { get; set; }
    public string StudentComment { get; set; }

    public Course Course { get; set; }
    public Student Student { get; set; }
}