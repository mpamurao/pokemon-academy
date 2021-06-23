import axios from 'axios';

const courseURL = `${process.env.REACT_APP_ROOT_URL || "http://localhost:8081"}/course`;

class CourseService {
    createCourse = data => {
      console.log(data);
      return axios
         .post(`${courseURL}/create`, data)
         .then(res => "course created")
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            return "bad request";
         });
   }

   // verify course login info
//    verify = (email, password) => {
//       const data = {
//          email,
//          password
//       }

    //   console.log(data);

//       return axios
//          .post(`${courseURL}/verify`, data)
//          .then(res => "logging in")
//          .catch(err => {
//             console.log("AXIOS ERROR: ", err);
//             return "invalid request";
//           });
//    }
}

export default new CourseService();