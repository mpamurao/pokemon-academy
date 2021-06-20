package classPortal.model;

import java.util.Set;

import javax.persistence.*;


//course_id, course_name, department, course_size, teacher
@Entity
@Table(name="course_directory")
public class CourseModel {
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long course_id;
	@Column
	private String course_name;
	@Column
	private String department;
	@Column
	private String course_size;
	@Column
	private String faculty;
	
//	single course can have many students and teachers
	@ManyToMany(mappedBy="courses_student")
	Set<StudentModel> students;
	@ManyToMany(mappedBy="courses_teacher")
	Set<TeacherModel> teachers;
	
	public long getcourse_id() {
		return course_id;
	}
	public void setcourse_id(long course_id) {
		this.course_id = course_id;
	}
	public String getcourse_name() {
		return course_name;
	}
	public void setcourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getcourse_size() {
		return course_size;
	}
	public void setcourse_size(String course_size) {
		this.course_size = course_size;
	}
	public String getFaculty() {
		return faculty;
	}
	public void setFaculty(String faculty) {
		this.faculty = faculty;
	}
	
}
