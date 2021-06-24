import axios from 'axios';

const employeeURL = `${process.env.REACT_APP_ROOT_URL || "http://localhost:8081"}/teacher`;

class TeacherService {
    addTeacher = data => {
      //  console.log(data);
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
      // console.log(email, password)
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

   // get courses taught by teacher
   getCoursesByTeacher = (email) => {
      const data = {email};
      console.log(data);
      return axios
         .get(`${employeeURL}/${email}/courses`, data)
         .then(res => res)
         .catch(err => {
            console.log(err.response)
            return "bad request"
         });
   }
}

export default new TeacherService();