import axios from 'axios';

const employeeURL = process.env.REACT_APP_ROOT_URL || "http://localhost:8081/employee";

class StudentService {
    addStudent = data => {
       console.log(data);
       return axios
        .post(`${employeeURL}/register`, data)
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
         .post(`${employeeURL}/verify`, data)
         .then(res => "logging in")
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            return "Invalid request";
          });
   }
}

export default new StudentService();