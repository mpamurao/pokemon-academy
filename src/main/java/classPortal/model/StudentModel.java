package classPortal.model;

import java.util.Set;

import javax.persistence.*;


//student_id, first_name, last_name, email, grade_level, major, minor
@Entity
@Table(name="students")
public class StudentModel {
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long student_id;
	@Column
	private String first_name;
	@Column
	private String last_name;
	@Column
	private String email;
	@Column
	private String password;
	@Column
	private String grade_level;
	@Column 
	private String major;
	@Column 
	private String minor;
	
//	single student can have many courses
	@ManyToMany
	@JoinTable(
			name = "courses_student",
			joinColumns = @JoinColumn(name = "student_id"),
			inverseJoinColumns = @JoinColumn(name = "course_id")
	)
	Set<CourseModel> courses_student;
	
	public long getStudent_id() {
		return student_id;
	}
	public void setStudent_id(long student_id) {
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
