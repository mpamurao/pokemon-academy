package classPortal.DTO;

import java.util.List;

public class CoursesOfStudent {
	private List<Long> courseIds;
	private String email;
	

	public List<Long> getCourseIds() {
		return courseIds;
	}
	public void setCourseIds(List<Long> courseIds) {
		this.courseIds = courseIds;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}

//object query
//{
//	courseIds: [{courseModel},...],
//	email
//	
//}