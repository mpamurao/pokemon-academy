package classPortal.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
//	create a new course and associate the teacher that created it
	public ResponseEntity<Object> addCourse(@Valid @RequestBody TeacherOfCourses teacherOfCourses) {
//		save the course to course_directory
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
	
	@PatchMapping("/directory/update")
//	update course
	public ResponseEntity<Object> updateCourse(@RequestBody CourseModel course) {
		Long course_id = course.getCourse_id();
		
		CourseModel currentCourse = courseService.getCourseById(course_id);
		currentCourse.setCourse_name(course.getCourse_name());
		currentCourse.setCourse_description(course.getCourse_description());
		currentCourse.setDepartment(course.getCourse_description());
		currentCourse.setCourse_size(course.getCourse_size());
		
		return new ResponseEntity<>(courseService.updateCourse(currentCourse), HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/directory/delete")
//	delete course
	public ResponseEntity<Object> deleteCourses(@RequestParam List<Long> courseIds) {
		courseService.deleteCourses(courseIds);
		return new ResponseEntity<>("Deleted course", HttpStatus.ACCEPTED);
	}
}
