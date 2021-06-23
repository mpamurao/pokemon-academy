package classPortal.model;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


//course_id, course_name, department, course_size, teacher
@Entity
@Table(name="course_directory")
public class CourseModel {
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long course_id;
	@Size(min=1)
	@NotNull
	@Column
	private String course_name;
	@Size(min=1)
	@NotNull
	@Column
	private String course_description;
	@Size(min=1)
	@NotNull
	@Column
	private String department;
	@NotNull
	@Column
	private int course_size;
	
//	single course can have many students and teachers

	@ManyToMany(fetch = FetchType.EAGER, mappedBy="courses_student")
	Set<StudentModel> students;
	@ManyToMany(fetch = FetchType.EAGER, mappedBy="courses_teacher")
	Set<TeacherModel> teachers;
	
	public Set<StudentModel> getStudents() {
		return students;
	}
	public void setStudents(Set<StudentModel> students) {
		this.students = students;
	}
	public Set<TeacherModel> getTeachers() {
		return teachers;
	}
	public void setTeachers(Set<TeacherModel> teachers) {
		this.teachers = teachers;
	}
	public Long getCourse_id() {
		return course_id;
	}
	public void setCourse_id(Long course_id) {
		this.course_id = course_id;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getCourse_description() {
		return course_description;
	}
	public void setCourse_description(String course_description) {
		this.course_description = course_description;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public int getCourse_size() {
		return course_size;
	}
	public void setCourse_size(int course_size) {
		this.course_size = course_size;
	}
	
}
