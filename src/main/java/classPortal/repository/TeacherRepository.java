package classPortal.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import classPortal.model.TeacherModel;

public interface TeacherRepository extends CrudRepository<TeacherModel, Long> {
	@Query("SELECT email FROM TeacherModel WHERE email = :emailInput")
	String checkEmailExists(@Param("emailInput") String emailInput);
	
	@Query("SELECT password FROM TeacherModel WHERE email = :emailInput")
	String checkPassFromEmail(@Param("emailInput") String emailInput);
	
	
	
	
	
	
//	@Query(value = "SELECT * FROM TeacherModel WHERE email = :emailInput", nativeQuery = true)
	TeacherModel findByEmail(String emailInput);
}
