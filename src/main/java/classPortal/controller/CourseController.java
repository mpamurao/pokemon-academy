package classPortal.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import classPortal.model.CourseModel;
import classPortal.service.CourseService;

@RestController
@RequestMapping("/course")
public class CourseController {
	@Autowired
	CourseService courseService;
	
//	CRUD
	
	@GetMapping("/directory")
//	get all courses
	public Iterable<CourseModel> getCourses() {
		return courseService.getCourses();
	}
	
	@GetMapping("/directory/{course_id}")
//	get course by id
	public ResponseEntity<Object> getCourseById(@PathVariable Long course_id) {
		return new ResponseEntity<>(courseService.getCourseById(course_id), HttpStatus.OK);
	}
	
	@PostMapping("/create")
//	create a new course
	public ResponseEntity<Object> addCourse(@Valid @RequestBody CourseModel course) {
		return new ResponseEntity<>(courseService.addCourse(course), HttpStatus.OK);
	}
	
	@PatchMapping("/directory/{course_id}")
//	update course
	public ResponseEntity<Object> updateCourse(@PathVariable CourseModel course) {
		return new ResponseEntity<>(courseService.updateCourse(course), HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/directory/{course_id}")
//	delete course
	public ResponseEntity<Object> deleteCourse(@PathVariable Long course_id) {
		courseService.deleteCourse(course_id);
		return new ResponseEntity<>("Deleted course", HttpStatus.ACCEPTED);
	}
}
