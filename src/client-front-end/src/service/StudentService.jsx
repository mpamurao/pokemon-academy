import axios from 'axios';

const studentURL = "http://localhost:8081/student";

class StudentService {
    addStudent = () => {
       console.log("Hello")
   }
}

export default new StudentService();