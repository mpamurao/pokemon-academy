package classPortal.repository;

import org.springframework.data.repository.CrudRepository;

import classPortal.model.StudentModel;

public interface StudentRepository extends CrudRepository<StudentModel, Long> {}
