public class GradeDTO
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }

    public int StudentId { get; set; }
    public string StudentName { get; set; }
    public string StudentSurname { get; set; }

    public double StudentGrade { get; set; }
    public int StudentAbsence { get; set; }
    public string StudentComment { get; set; }
}