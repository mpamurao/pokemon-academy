import React, {useState} from 'react';
import StudentService from '../../service/StudentService';
import {Button, Typography,  Paper} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';

function CoursesStudent(props) {
    const {email, classes} = props;
    const [courses, setCourses] = useState([]);
    const [warning, setWarning] = useState("");
    const [headCells, setHeadCells] = useState([]);
    const [removedCourses, setRemovedCourses] = useState([]);
    const [validateRemovedCourse, setValidateRemovedCourse] = useState(false);

    useEffect(() => {
        if (!email) {
            setWarning("No email provided.");
            return;
        }
        setValidateRemovedCourse(false);
        setHeadCells(["course_id", "course_name", "course_description", "department", "course_size", "students_enrolled"]);
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
            return {field: header, headerName:header, width:150, editable: false, 
                headerAlign: "center", cellClassName:"courseInfo"}
        }
        if (header === "students_enrolled") {
            return {field: header, headerName:header, width:200, editable: false, 
                headerAlign: "center", cellClassName:"courseInfo"}
        }
        if (header === "course_description") {
            return {field: header, headerName:header, width:350, editable: false,
                headerAlign: "center", cellClassName:"courseInfo"}
        }

        return {field: header, headerName:header, width:200, editable: false,
            headerAlign: "center", cellClassName:"courseInfo"}
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

    const removeCoursesFromStudent = () => {
        StudentService.removeCoursesFromStudent(email, removedCourses)
            .then(res => {
                console.log(res);
                setValidateRemovedCourse(true);
                getCoursesByStudent();
                setRemovedCourses([]);
            });
    }

    return (
        <div className={classes.tableDisplay}>
            {warning === "No email provided." ? <Typography className={classes.instructions}>{warning}</Typography> : ""}

            {validateRemovedCourse
                ? <Typography color="error" className={classes.instructions}>
                    Class removed from schedule.
                    </Typography> 
                : ""
            }

            <Paper style={{ height: 450, width: '100%' }}>
                <DataGrid className={classes.root}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    autoPageSize
                    onSelectionModelChange={newSelection => setRemovedCourses(newSelection.selectionModel)}
                />
            </Paper> 

            <Button variant="contained" color="primary" 
                onClick={removeCoursesFromStudent} 
                className={classes.buttonTable}>
                    Remove Class
            </Button>
        </div>
    );
}

export default CoursesStudent;