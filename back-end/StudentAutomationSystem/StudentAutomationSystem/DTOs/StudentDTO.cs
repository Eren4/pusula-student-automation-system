
public class StudentDTO
{
	public int StudentID { get; set; }
	public string StudentName { get; set; }
	public string StudentSurname { get; set; }
	public string StudentEmail { get; set; }
	public List<GradeDTO> Grades { get; set; }
}