import axios from 'axios';

const studentURL = process.env.REACT_APP_ROOT_URL || "http://localhost:8081/student";

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