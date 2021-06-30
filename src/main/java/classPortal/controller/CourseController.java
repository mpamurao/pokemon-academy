package classPortal.controller;

import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import classPortal.DTO.TeacherOfCourses;
import classPortal.model.CourseModel;
import classPortal.model.TeacherModel;
import classPortal.service.CourseService;
import classPortal.service.TeacherService;

@RestController
@RequestMapping("/course")
@CrossOrigin("*")
public class CourseController {
	@Autowired
	CourseService courseService;
	@Autowired
	TeacherService teacherService;
	
	private MultiValueMap<String,String> headers = new LinkedMultiValueMap<String,String>() {{
		put("Access-Control-Allow-Methods", Arrays.asList("GET,POST,PATCH,DELETE,PUT,OPTIONS"));
	}};
	
//	CRUD
	
//	get all courses
	@GetMapping("/directory")
	public Iterable<CourseModel> getCourses() {
		return courseService.getCourses();
	}
	
//	get course by id
	@GetMapping("/directory/{course_id}")
	public ResponseEntity<Object> getCourseById(@PathVariable Long course_id) {
		return new ResponseEntity<>(courseService.getCourseById(course_id), HttpStatus.OK);
	}
	
//	create a new course and associate the teacher that created it
	@PostMapping("/create")
	public ResponseEntity<Object> addCourse(@Valid @RequestBody TeacherOfCourses teacherOfCourses) {
		CourseModel course = teacherOfCourses.getCourseModel();
//		save course to table
		CourseModel createdCourse = courseService.addCourse(course);
		
		String email = teacherOfCourses.getEmail();
		
//		get the teacher model associated to the email
		TeacherModel teacher = teacherService.getTeacherFromEmail(email);
		
//		courses_teacher is a Set/Collection of CourseModels
//		add the CourseModel createdCourse to the teacher's courses_teacher collection
		teacher.getCourses_teacher().add(createdCourse);
		teacherService.addTeacher(teacher);
		
//		return data of courses that are associated with single teacher
		return new ResponseEntity<>(teacher.getCourses_teacher(), HttpStatus.OK);
	}
	
//	update course
	@PutMapping("/directory/update")
	public ResponseEntity<Object> updateCourse(@RequestBody CourseModel course) {
		Long course_id = course.getCourse_id();
		
		CourseModel currentCourse = courseService.getCourseById(course_id);
		currentCourse.setCourse_name(course.getCourse_name());
		currentCourse.setCourse_description(course.getCourse_description());
		currentCourse.setDepartment(course.getDepartment());
		currentCourse.setCourse_size(course.getCourse_size());
		
		return new ResponseEntity<>(courseService.updateCourse(currentCourse), headers, HttpStatus.ACCEPTED);
	}
	
//	delete course
	@DeleteMapping("/directory/delete")
//	localhost:8081/course/directory/delete?courseIds=#,#,#
	public ResponseEntity<Object> deleteCourses(@RequestParam List<Long> courseIds) {
		courseService.deleteCourses(courseIds);
		return new ResponseEntity<>("Deleted course", headers, HttpStatus.ACCEPTED);
	}
	
}
