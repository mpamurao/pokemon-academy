import axios from 'axios';

const studentURL = "http://localhost:8081/student";

class StudentService {
    addStudent = (data) => {
       console.log(data);
       return axios
        .post(`${studentURL}/register`, data)
        .then(res => console.log(res))
        .catch(err => console.log("AXIOS ERROR: ", err));
   }
}

export default new StudentService();