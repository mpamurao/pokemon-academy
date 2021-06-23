package classPortal.model;

import java.util.Set;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;


//employee, first_name, last_name, email, grade_level, major, minor
@Entity
@Table(name="teachers")
public class TeacherModel {
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long employee_id;
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
	@Column(unique=true)
	private String email;
	@Size(min=1)
	@NotNull
	@Column
	private String password;
	@Size(min=1)
	@NotNull
	@Column
	private String department;
	@Size(min=1)
	@NotNull
	@Column
	private String employee_title;
	
//	single teacher can have many courses
	@ManyToMany(fetch = FetchType.EAGER)
//	@JsonIgnore - stops serialization/prevents infinite loop when going into teacher to see its associated courses
//	and then seeing that course has teachers associated to it in method call
//	teacher.getCourses_teacher()
	@JsonIgnore
	@JoinTable(
			name = "courses_teacher",
			joinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "employee_id"),
			inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "course_id")
	)
	Set<CourseModel> courses_teacher;
	
	public Set<CourseModel> getCourses_teacher() {
		return courses_teacher;
	}
	public void setCourses_teacher(Set<CourseModel> courses_teacher) {
		this.courses_teacher = courses_teacher;
	}
	public Long getEmployee_id() {
		return employee_id;
	}
	public void setEmployee_id(Long employee_id) {
		this.employee_id = employee_id;
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
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getEmployee_title() {
		return employee_title;
	}
	public void setEmployee_title(String employee_title) {
		this.employee_title = employee_title;
	}
	
}
