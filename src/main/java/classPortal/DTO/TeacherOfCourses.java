package classPortal.DTO;

import classPortal.model.CourseModel;

public class TeacherOfCourses {
	private CourseModel courseModel;
	private String email;
	
	public CourseModel getCourseModel() {
		return courseModel;
	}
	public void setCourseModel(CourseModel courseModel) {
		this.courseModel = courseModel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}

//provides object query in this form:
//	{
//		courseModel: {courseModel object info},
//		email: email string
//	}
