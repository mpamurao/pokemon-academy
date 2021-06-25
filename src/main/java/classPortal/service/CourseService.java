package classPortal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import classPortal.model.CourseModel;
import classPortal.repository.CourseRepository;

@Service
public class CourseService {
	@Autowired
	CourseRepository courseRepo;
	
//	CRUD
	
//	get all courses
	public Iterable<CourseModel> getCourses() {
		return courseRepo.findAll();
	}
	
//	get course by id
	public CourseModel getCourseById(Long course_id) {
		return courseRepo.findById(course_id).get();
	}
	
//	create a new course
	public CourseModel addCourse(CourseModel course) {
		return courseRepo.save(course);
	}
	
//	update course
	public CourseModel updateCourse(CourseModel course) {
		return courseRepo.save(course);
	}
	
//	delete course
	public void deleteCourses(List<Long> courseIds) {
		courseRepo.deleteAllById(courseIds);
	}
	

}
