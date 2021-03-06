package classPortal.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import classPortal.model.CourseModel;
import classPortal.model.StudentModel;
import classPortal.service.CourseService;
import classPortal.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin("*")
public class StudentController {
	@Autowired
	StudentService studentService;
	@Autowired
	CourseService courseService;
	
	private MultiValueMap<String,String> headers = new LinkedMultiValueMap<String,String>() {{
//		put("Access-Control-Allow-Origin", Arrays.asList("*"));
		put("Access-Control-Allow-Methods", Arrays.asList("GET,POST,PATCH,DELETE,PUT,OPTIONS"));
	}};
	
//	CRUD
	
//	get all students
	@GetMapping("/directory")
	public Iterable<StudentModel> getStudents() {
		return studentService.getStudents();
	}
	
//	get student by id
	@GetMapping("/directory/{student_id}")
	public ResponseEntity<Object> getStudentById(@PathVariable Long student_id) {
//		return a response that includes the request body and httpstatus
		return new ResponseEntity<>(studentService.getStudentById(student_id), HttpStatus.OK);
	}
	
//	post/create new student
	@PostMapping("/register")
	public ResponseEntity<Object> addStudent(@Valid @RequestBody StudentModel student) {
		//	return bad response if conditions are met (value is null in student body request)
		if (student.getFirst_name() == null || student.getLast_name() == null || student.getEmail() == null 
				|| student.getPassword() == null || student.getMajor() == null) {
			return new ResponseEntity<>("Invalid input", HttpStatus.BAD_REQUEST);
		}
		if (checkEmailExists(student.getEmail())) {
			return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(studentService.addStudent(student), HttpStatus.ACCEPTED);
	}
	
//	update student
	@PatchMapping("/directory/{student_id}")
	public ResponseEntity<Object> updateStudent(@Valid @RequestBody StudentModel student) {
		return new ResponseEntity<>(studentService.updateStudent(student), HttpStatus.ACCEPTED);
	}
	
//	delete student profile
	@DeleteMapping("/directory/{student_id}")
	public ResponseEntity<Object> deleteStudent(@PathVariable Long student_id) {
		studentService.deleteStudent(student_id);
		return new ResponseEntity<>("Deleted student profile", HttpStatus.ACCEPTED);
	}
	
	public boolean checkEmailExists(String emailInput) {
		return emailInput.equalsIgnoreCase(studentService.checkEmailExists(emailInput));
	}
	
	public boolean checkCorrespondingPass(String password, String emailInput) {
		return password.equalsIgnoreCase(studentService.checkCorrespondingPass(emailInput));
	}
	
	@PostMapping("/verify")
	public ResponseEntity<Object> verifyStudent(@RequestBody StudentModel student) {
//		if email exists in DB and password matches
		if (checkEmailExists(student.getEmail())) {
			System.out.println("PASSED EMAIL CHECK");
//			System.out.println(checkCorrespondingPass(student.getPassword()));
			if (checkCorrespondingPass(student.getPassword(),student.getEmail())) {
				return new ResponseEntity<>("Logging in...", HttpStatus.OK);
			}
		}
		return new ResponseEntity<>("Invalid email and/or password.", HttpStatus.UNAUTHORIZED);
	}
	
//	get course that are associated with the teacher
	@GetMapping("/{email}/courses")
	public ResponseEntity<Object> getCoursesByStudent(@PathVariable String email) {
//		get the teacher model associated to the email in request body
		StudentModel currentStudent = studentService.getStudentFromEmail(email);
		
		return new ResponseEntity<>(currentStudent.getCourses_student(), HttpStatus.OK);
	}
	
//	add courses to courses_student
	@PostMapping("/{email}/add")
	public ResponseEntity<Object> addCoursesToStudent(@PathVariable String email, @RequestParam List<Long> courseIds) {
		StudentModel currentStudent = studentService.getStudentFromEmail(email);
		
		Iterable<CourseModel> addedCourses= courseService.getAllCoursesById(courseIds);
		
		for (CourseModel course: addedCourses) {
//			if course size is the same value as course enrolled, don't enroll student into the class
			if (course.getCourse_size() <=  course.getStudents().size()) {
				return new ResponseEntity<>("Class is full: " + course.getCourse_name(), headers, HttpStatus.CONFLICT);
			}
			
			currentStudent.getCourses_student().add(course);
		};
		
		studentService.updateStudent(currentStudent);
		return new ResponseEntity<>("Added courses to schedule", headers, HttpStatus.ACCEPTED);
	}
	
//	remove courses from courses_student
	@DeleteMapping("/{email}/remove")
	public ResponseEntity<Object> removeCoursesFromStudent(@PathVariable String email, @RequestParam List<Long> courseIds) {
		StudentModel currentStudent = studentService.getStudentFromEmail(email);
//		List<CourseModels> coursesToBeRemoved = new List<>();
		currentStudent.getCourses_student().removeIf(course -> courseIds.contains(course.getCourse_id()));
		
		studentService.updateStudent(currentStudent);
		return new ResponseEntity<>("Removed courses from schedule", headers, HttpStatus.ACCEPTED);

	}
}
