import React, {useState} from 'react';
import StudentService from '../../service/StudentService';
import {Button, Typography,  Paper} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import CourseService from '../../service/CourseService';

function CoursesStudent(props) {
    const {email, classes} = props;
    const [courses, setCourses] = useState([]);
    const [warning, setWarning] = useState("");
    const [headCells, setHeadCells] = useState([]);
    // const [deletedCourses, setDeletedCourses] = useState([]);

    useEffect(() => {
        if (!email) {
            setWarning("No email provided.");
            return;
        }

        setHeadCells(["course_id", "course_name", "course_description", "department", "course_size", "course_enrolled"]);
        getCoursesByStudent();

    }, []);

    const getCoursesByStudent = () => {
        StudentService.getCoursesByStudent(email)
            .then(res => {
                if (res === "bad request") {
                    return;
                }
                console.log(res)
                const response = res.data;
                setCourses(response);
                // console.log(response);
            });
    }

    const columns = headCells.map(header => {
        // console.log(header);
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
            course_enrolled:course.course_enrolled,
        })
    )

    return (
        <div>
            {warning === "No email provided." ? <Typography>{warning}</Typography> : ""}
            <Paper style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    autoPageSize
                />
            </Paper> 
        </div>
    );
}

export default CoursesStudent;