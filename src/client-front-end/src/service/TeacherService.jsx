import axios from 'axios';

const employeeURL = `${process.env.REACT_APP_ROOT_URL || "http://localhost:8081"}/teacher`;

class TeacherService {
    addTeacher = data => {
       console.log(data);
       return axios
        .post(`${employeeURL}/register`, data)
        .then(res => "account created")
        .catch(err => {
           console.log("AXIOS ERROR: ", err);
           return err.response.data;
        });
   }

   // verify teacher login info
   verify = (email, password) => {
      console.log(email, password)
      const data = {
         email,
         password
      }

      // console.log(data);

      return axios
         .post(`${employeeURL}/verify`, data)
         .then(res => "logging in")
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            // return http status response from backend ResponseEntity<>
            return err.response.data;
          });
   }
}

export default new TeacherService();