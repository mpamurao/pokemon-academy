import axios from 'axios';

const studentURL = `${process.env.REACT_APP_ROOT_URL || "http://localhost:8081"}/student`;

class StudentService {
   addStudent = data => {
      // console.log(data);
      return axios
         .post(`${studentURL}/register`, data)
         .then(res => "account created")
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            return "bad request";
         });
   }

   // verify student login info
   verify = (email, password) => {
      const data = {
         email,
         password
      }

      // console.log(data);

      return axios
         .post(`${studentURL}/verify`, data)
         .then(res => "logging in")
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            return "invalid request";
         });
   }

   // get courses taught by teacher
   getCoursesByStudent = (email) => {
      const data = {email};
      // console.log(data);
      return axios
         .get(`${studentURL}/${email}/courses`, data)
         .then(res => res)
         .catch(err => {
            console.log(err.response);
            return "bad request";
         });
   }

   addCoursesToStudent = (email, courses) => {

      return axios
         .post(`${studentURL}/${email}/add?courseIds=${courses.join(",")}`)
         .then(res => res.data)
         .catch(err => {
            return err.response.data;
         });
   }

   removeCoursesFromStudent = (email, courses) => {
      return axios
      .post(`${studentURL}/${email}/remove?courseIds=${courses.join(",")}`)
      .then(res => res.data)
      .catch(err => {
         return err.response.data;
      });
   }
}

export default new StudentService();