package classPortal.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import classPortal.model.StudentModel;
import classPortal.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin("*")
public class StudentController {
	@Autowired
	StudentService studentService;
	
//	CRUD
	
	@GetMapping("/directory")
//	get all students
	public Iterable<StudentModel> getStudents() {
		return studentService.getStudents();
	}
	
	@GetMapping("/directory/{student_id}")
//	get student by id
	public ResponseEntity<Object> getStudentById(@PathVariable Long student_id) {
//		return a response that includes the request body and httpstatus
		return new ResponseEntity<>(studentService.getStudentById(student_id), HttpStatus.OK);
	}
	
	@PostMapping("/register")
//	post/create new student
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
	
	@PatchMapping("/directory/{student_id}")
//	update student
	public ResponseEntity<Object> updateStudent(@Valid @RequestBody StudentModel student) {
		return new ResponseEntity<>(studentService.updateStudent(student), HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/directory/{student_id}")
//	delete student profile
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
	
	@GetMapping("/{email}/courses")
//	get course that are associated with the teacher
	public ResponseEntity<Object> getCoursesByStudent(@PathVariable String email) {
//		get the teacher model associated to the email in request body
		StudentModel currentStudent = studentService.getStudentFromEmail(email);
		
		return new ResponseEntity<>(currentStudent.getCourses_student(), HttpStatus.OK);
	}
}
