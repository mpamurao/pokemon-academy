<h2>Class Portal Project</h2>

Deployed on Heroku: https://pokemon-academy.herokuapp.com/

<h4>Frontend Technologies:</h4> JavaScript, React, HTML, CSS, Material-UI<br>
<h4>Backend Technologies:</h4> Java, Spring Boot, PostgreSQL<br>

<h3>User Story:</h3>
<p>The class portal simulates the environment where students and teachers can view a class directory. There is a student portal and a teacher portal that provide different access levels. Class Portal follows a pokemon themed Pokemon Academy</p>
<p>Students can create an account to view the available courses. A class can be added or removed from their schedule.</p>
<p>Teachers can create an account to view the available courses. A teacher has the ability to create a new course or delete an existing course from the course directory.</p>


<h3>Infrastructure:</h3>
<h4>Backend:</h4>
<p>Backend includes MVC layout to develop a CRUD app. Models include student, teacher, and course that have many-to-many relationships. I.e. a student can have many courses, a course can have many students. A joined table is created for student::course and teacher::course relationships to indicate respective primary key (course_id and student/teacher_id).</p>

<p>Set-up postgreSQL database to test queries locally. Set-up Heroku postgreSQL for remote database.
Initialized continuous deployment from Github master branch to Heroku app.</p>

<h4>Frontend:</h4>
<p>Frontend provides components for the home page, teacher components, and student components. A service folder contains all the query requests used to ping the backend. A user can navigate through the app by first choosing whether they're a student or teacher, and then have the ability to log into their respective portal.</p>

<h4>Wireframes</h4>
https://github.com/mpamurao/pokemon-academy/tree/master/scope%20of%20work/wireframes
