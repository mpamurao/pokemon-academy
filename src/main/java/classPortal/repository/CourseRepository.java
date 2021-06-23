package classPortal.repository;

import org.springframework.data.repository.CrudRepository;

import classPortal.model.CourseModel;

public interface CourseRepository extends CrudRepository<CourseModel, Long> {	
}
