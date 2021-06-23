package classPortal.model;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;


//student_id, first_name, last_name, email, grade_level, major, minor
@Entity
@Table(name="students")
public class StudentModel {
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long student_id;
	@Size(min=1)
	@NotNull
	@Column
	private String first_name;
	@Size(min=1)
	@NotNull
	@Column
	private String last_name;
	@Size(min=1)
	@NotNull
	@Column
	private String email;
	@Size(min=1)
	@NotNull
	@Column
	private String password;
	@Size(min=1)
	@NotNull
	@Column
	private String grade_level;
	@Size(min=1)
	@NotNull
	@Column
	private String major;
	@Size(min=1)
	@NotNull
	@Column
	private String minor;
	
//	single student can have many courses
//	create new table with student_id and course_id
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "courses_student",
			joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "student_id"),
			inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "course_id")
	)
	@JsonIgnore
	Set<CourseModel> courses_student;
	
	public Set<CourseModel> getCourses_student() {
		return courses_student;
	}
	public void setCourses_student(Set<CourseModel> courses_student) {
		this.courses_student = courses_student;
	}
	public Long getStudent_id() {
		return student_id;
	}
	public void setStudent_id(Long student_id) {
		this.student_id = student_id;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getGrade_level() {
		return grade_level;
	}
	public void setGrade_level(String grade_level) {
		this.grade_level = grade_level;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getMinor() {
		return minor;
	}
	public void setMinor(String minor) {
		this.minor = minor;
	}
	
}
