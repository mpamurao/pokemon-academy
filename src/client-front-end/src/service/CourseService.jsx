import axios from 'axios';

const courseURL = `${process.env.REACT_APP_ROOT_URL || "http://localhost:8081"}/course`;

class CourseService {
   createCourse = data => {
   // console.log(data);
   return axios
      .post(`${courseURL}/create`, data)
      .then(res => "course created")
      .catch(err => {
         console.log("AXIOS ERROR: ", err);
         return "bad request";
      });
   }

   deleteCourses = data => {
      // set query parameters after URL
      return axios
         .delete(`${courseURL}/directory/delete?courseIds=${data.join(",")}`)
         .then(res => res)
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            return "bad request";
         });
   }

   updateCourse = data => {
      // console.log(data)
      return axios
         .put(`${courseURL}/directory/update`, data)
         .then(res => res.data)
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            return "bad request";
         });
   }

   getCourses = () => {
      return axios
         .get(`${courseURL}/directory`)
         .then(res => res)
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            return "bad request";
         });
   }
}

export default new CourseService();