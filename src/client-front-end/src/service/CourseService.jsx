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

   deleteCourse = course_id => {
      return axios
         .delete(`${courseURL}/directory/${course_id}`, {course_id})
         .then(res => res)
         .catch(err => {
            console.log("AXIOS ERROR: ", err);
            return "bad request";
         })
   }
}

export default new CourseService();