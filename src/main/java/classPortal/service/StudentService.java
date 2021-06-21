package classPortal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import classPortal.model.StudentModel;
import classPortal.repository.StudentRepository;

@Service
public class StudentService {
	@Autowired
	StudentRepository studentRepo;
	
//	CRUD
	
//	get all students
	public Iterable<StudentModel> getStudents() {
		return studentRepo.findAll();
	}
	
//	get student by id
	public StudentModel getStudentById(Long student_id) {
		return studentRepo.findById(student_id).get();
	}
	
//	get specific email
	public String checkExistingEmail(String emailInput) {
		return studentRepo.checkExistingEmail(emailInput);
	}
//	post/create new student
	public StudentModel addStudent(StudentModel student) {
		return studentRepo.save(student);
	}
	
//	update student
	public StudentModel updateStudent(StudentModel student) {
		return studentRepo.save(student);
	}
	
//	delete student profile
	public void deleteStudent(Long student_id) {
		studentRepo.deleteById(student_id);
	}
	
}
