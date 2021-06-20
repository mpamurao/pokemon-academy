package classPortal.model;

import java.util.Set;

import javax.persistence.*;


//employee, first_name, last_name, email, grade_level, major, minor
@Entity
@Table(name="teachers")
public class TeacherModel {
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long employee_id;
	@Column
	private String first_name;
	@Column
	private String last_name;
	@Column
	private String email;
	@Column
	private String password;
	@Column
	private String department;
	@Column 
	private String employee_title;
	
//	single teacher can have many courses
	@ManyToMany
	@JoinTable(
			name = "courses_teacher",
			joinColumns = @JoinColumn(name = "employee_id"),
			inverseJoinColumns = @JoinColumn(name = "course_id")
	)
	Set<CourseModel> courses_teacher;
	
	public long getEmployee_id() {
		return employee_id;
	}
	public void setEmployee_id(long employee_id) {
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
