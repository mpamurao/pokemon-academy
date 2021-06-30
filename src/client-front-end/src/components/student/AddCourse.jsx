import React, {useState} from 'react';
import StudentService from '../../service/StudentService';
import {Button, Typography, Paper} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import CourseService from '../../service/CourseService';

function AddCourse(props) {
    const {email} = props;
    const [courses, setCourses] = useState([]);
    const [headCells, setHeadCells] = useState([]);
    const [addedCourses, setAddedCourses] = useState([]);
    const [classSizeMaxed, setClassSizeMaxed] = useState(false);

    useEffect(() => {
        setHeadCells(["course_id", "course_name", "course_description", "department", "course_size", "students_enrolled"]);
        getCourses();
    }, []);

    const getCourses = () => {
        CourseService.getCourses()
            .then(res => {
                if (res === "bad request") {
                    return;
                }
                // console.log("res ", res)
                const response = res.data;
                setCourses(response);
            });
    }

    const columns = headCells.map(header => {
        if (header === "course_id") {
            return {field: header, headerName:header, width:150, editable: false}
        }
        if (header === "course_description") {
            return {field: header, headerName:header, width:350, editable: false}
        }

        return {field: header, headerName:header, width:200, editable: false}
        
    })

    const rows = courses.map(course =>({
            id: course.course_id,
            course_id: course.course_id,
            course_name: course.course_name,
            course_description: course.course_description,
            department: course.department,
            course_size: course.course_size,
            students_enrolled:`${course.students.length} / ${course.course_size}`,
        })
    )

    const addCourseToSchedule = () => {
        StudentService.addCoursesToStudent(email, addedCourses)
            .then(res => {
                // console.log(res)
                if (res.includes("Class is full")) {
                    setClassSizeMaxed(res);
                    return;
                }

                setClassSizeMaxed(false);
                StudentService.getCoursesByStudent(email);
                setAddedCourses([]);
            });
    }

    return (
        <div>
            <Typography> Select classes to add to your class schedule</Typography>
            {classSizeMaxed ? <Typography color="error">{classSizeMaxed}. Please try adding a different course.</Typography> : ""}
            <Paper style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    autoPageSize
                    onSelectionModelChange={newSelection => setAddedCourses(newSelection.selectionModel)}
                />
            </Paper>
            <Button variant="contained" color="primary" onClick={addCourseToSchedule}>Add to Schedule</Button>
        </div>
    );
}

export default AddCourse;