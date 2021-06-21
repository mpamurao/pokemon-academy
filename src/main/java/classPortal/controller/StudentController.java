package classPortal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import classPortal.model.StudentModel;
import classPortal.service.StudentService;

@RestController
@RequestMapping("/student")
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
	public ResponseEntity<Object> addStudent(@RequestBody StudentModel student) {
		//	return bad response if conditions are met (value is null in student body request)
		if (student.getFirst_name() == null || student.getLast_name() == null || student.getEmail() == null 
				|| student.getPassword() == null || student.getMajor() == null || student.getMinor() == null) {
			return new ResponseEntity<>("Invalid input", HttpStatus.BAD_REQUEST);
		}
		if (student.getEmail().equalsIgnoreCase(studentService.checkExistingEmail(student.getEmail()))) {
			return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(studentService.addStudent(student), HttpStatus.ACCEPTED);
	}
	
	@PatchMapping("/{student_id}")
//	update student
	public ResponseEntity<Object> updateStudent(@RequestBody StudentModel student) {
		return new ResponseEntity<>(studentService.updateStudent(student), HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/{student_id}")
//	delete student profile
	public ResponseEntity<Object> deleteStudent(@PathVariable Long student_id) {
		studentService.deleteStudent(student_id);
		return new ResponseEntity<>("Deleted student profile", HttpStatus.ACCEPTED);
	}
	
}
