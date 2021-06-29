package classPortal.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import classPortal.model.StudentModel;

public interface StudentRepository extends CrudRepository<StudentModel, Long> {
	@Query("SELECT email FROM StudentModel WHERE email = :emailInput")
	String checkEmailExists(@Param("emailInput") String emailInput);
	
	@Query("SELECT password FROM StudentModel WHERE email = :emailInput")
	String checkCorrespondingPass(@Param("emailInput") String emailInput);
	
	StudentModel findByEmail(String emailInput);
}
