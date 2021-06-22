<h2>Class Portal Project</h2>

Deployed on Heroku: https://pokemon-academy.herokuapp.com/

<h3>Technologies:</h3> JavaScript, Java, HTML, CSS, Material-UI<br>
<h3>Frameworks:</h3> React, Spring boot<br>
<h3>Database:</h3> PostgreSQL<br>

Infrastructure:
Set-up postgreSQL database to test queries locally. Set-up Heroku postgreSQL for remote database.
Initialized continuous deployment from Github master branch to Heroku app.

Backend:
Backend includes MVC layout to develop a CRUD app.

Models include student, teacher, and course that have many-to-many relationships. I.e. a student can have many courses, a course can have many students. A joined table is created for student::course and teacher::course relationships to indicate respective primary key (course_id and student/teacher_id).