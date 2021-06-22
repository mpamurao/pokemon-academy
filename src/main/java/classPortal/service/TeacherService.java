package classPortal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import classPortal.model.TeacherModel;
import classPortal.repository.TeacherRepository;

@Service
public class TeacherService {
	@Autowired
	TeacherRepository teacherRepo;
	
//	CRUD
	
//	get all teachers
	public Iterable<TeacherModel> getTeachers() {
		return teacherRepo.findAll();
	}
	
//	get teacher by id
	public TeacherModel getTeacherById(Long employee_id) {
		return teacherRepo.findById(employee_id).get();
	}
	
//	post/create new teacher
	public TeacherModel addTeacher(TeacherModel teacher) {
		return teacherRepo.save(teacher);
	}
	
//	update teacher
	public TeacherModel updateTeacher(TeacherModel teacher) {
		return teacherRepo.save(teacher);
	}
	
//	delete teacher profile
	public void deleteTeacher(Long employee_id) {
		teacherRepo.deleteById(employee_id);
	}
	
//	get specific email
	public String checkEmailExists(String emailInput) {
		return teacherRepo.checkEmailExists(emailInput);
	}
	
//	verify password matches to corresponding email
	public String checkCorrespondingPass(String emailInput) {
		return teacherRepo.checkCorrespondingPass(emailInput);
	}
}
