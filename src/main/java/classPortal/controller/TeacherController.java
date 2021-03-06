package classPortal.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import classPortal.model.TeacherModel;
import classPortal.service.TeacherService;

@RestController
@RequestMapping("/teacher")
@CrossOrigin("*")
public class TeacherController {
	@Autowired
	TeacherService teacherService;
	
//	CRUD
	
//	get all teachers
	@GetMapping("/directory")
	public Iterable<TeacherModel> getTeachers() {
		return teacherService.getTeachers();
	}
	
//	get teacher by id
	@GetMapping("/directory/{employee_id}")
	public ResponseEntity<Object> getTeacherById(@PathVariable Long employee_id) {
//		return a response that includes the request body and httpstatus
		return new ResponseEntity<>(teacherService.getTeacherById(employee_id), HttpStatus.OK);
	}
	
//	post/create new teacher
	@PostMapping("/register")
	public ResponseEntity<Object> addTeacher(@Valid @RequestBody TeacherModel teacher) {
		//	return bad response if conditions are met (value is null in teacher body request)
		if (teacher.getFirst_name() == null || teacher.getLast_name() == null || teacher.getEmail() == null 
				|| teacher.getPassword() == null || teacher.getDepartment() == null || teacher.getEmployee_title() == null) {
			return new ResponseEntity<>("Invalid input", HttpStatus.BAD_REQUEST);
		}
		if (checkEmailExists(teacher.getEmail())) {
			return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(teacherService.addTeacher(teacher), HttpStatus.ACCEPTED);
	}
	
//	update teacher
	@PatchMapping("/directory/{employee_id}")
	public ResponseEntity<Object> updateTeacher(@Valid @RequestBody TeacherModel teacher) {
		return new ResponseEntity<>(teacherService.updateTeacher(teacher), HttpStatus.ACCEPTED);
	}
	
//	delete teacher profile
	@DeleteMapping("/directory/{employee_id}")
	public ResponseEntity<Object> deleteTeacher(@PathVariable Long employee_id) {
		teacherService.deleteTeacher(employee_id);
		return new ResponseEntity<>("Deleted teacher profile", HttpStatus.ACCEPTED);
	}
	
	public boolean checkEmailExists(String emailInput) {
		return emailInput.equalsIgnoreCase(teacherService.checkEmailExists(emailInput));
	}
	
	public boolean checkPassFromEmail(String password, String emailInput) {
		return password.equalsIgnoreCase(teacherService.checkPassFromEmail(emailInput));
	}
	
	@PostMapping("/verify")
	public ResponseEntity<Object> verifyTeacher(@RequestBody TeacherModel teacher) {
//		if email exists in DB and password matches
		if (checkEmailExists(teacher.getEmail())) {
			System.out.println("PASSED EMAIL CHECK");
//			System.out.println(checkPassFromEmail(teacher.getPassword()));
			if (checkPassFromEmail(teacher.getPassword(),teacher.getEmail())) {
				return new ResponseEntity<>("Logging in...", HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<>("Invalid email and/or password.", HttpStatus.UNAUTHORIZED);
	}
	
//	get course that are associated with the teacher
	@GetMapping("/{email}/courses")
	public ResponseEntity<Object> getCoursesByTeacher(@PathVariable String email) {
//		get the teacher model associated to the email in request body
		TeacherModel currentTeacher = teacherService.getTeacherFromEmail(email);
		
		return new ResponseEntity<>(currentTeacher.getCourses_teacher(), HttpStatus.OK);
	}
}
