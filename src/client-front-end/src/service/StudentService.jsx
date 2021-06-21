import axios from 'axios';

const studentURL = process.env.REACT_APP_ROOT_URL || "http://localhost:8081/student";

class StudentService {
    addStudent = data => {
       console.log(data);
       return axios
        .post(`${studentURL}/register`, data)
        .then(res => console.log(res))
        .catch(err => {
           console.log("AXIOS ERROR: ", err);
           return console.log("bad request");
         });
   }

   // verify student login info
   verify = (email, password) => {
      const data = {
         email,
         password
      }

      console.log(data);

      return axios
         .post(`${studentURL}/verify`, data)
         .then(res => "logging in")
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            return "Invalid request";
          });
   }
}

export default new StudentService();