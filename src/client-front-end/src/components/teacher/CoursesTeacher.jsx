import React, {useState} from 'react';
import TeacherService from '../../service/TeacherService';
import {Button, Typography,  Paper} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import CourseService from '../../service/CourseService';

function CoursesTeacher(props) {
    const {email} = props;
    const [courses, setCourses] = useState([]);
    const [warning, setWarning] = useState("");
    const [headCells, setHeadCells] = useState([]);
    const [deletedCourses, setDeletedCourses] = useState([]);

    useEffect(() => {
        if (!email) {
            setWarning("No email provided.");
            return;
        }

        setHeadCells(["course_id", "course_name", "course_description", "department", "course_size", "students_enrolled"]);
        getCoursesByTeacher();

    }, []);

    const getCoursesByTeacher = () => {
        TeacherService.getCoursesByTeacher(email)
            .then(res => {
                if (res === "bad request") {
                    return;
                }
                // console.log(res)
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
        if (header === "students_enrolled") {
            return {field: header, headerName:header, width:200, editable: false}
        }
        if (header === "course_description") {
            return {field: header, headerName:header, width:350, editable: true}
        }

        return {field: header, headerName:header, width:200, editable: true}
        
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

    const deleteCourses = () => {
        console.log(deletedCourses)
        CourseService.deleteCourses(deletedCourses)
        .then(res => {
            console.log(res);
            getCoursesByTeacher();
            setDeletedCourses([]);
        });      
    }

    const handleEditCellChangeCommitted = (event) => {
        // field: "course_name"
        // id: 58
        // props:
        // value: "b"
        // console.log(event);

        const updatedCourse = courses.filter(course => {
            if (course.course_id === event.id) {
                if (event.field === "course_size" && isNaN(event.props.value)) {
                    return false;
                    
                }
                return true;
            }
        })[0];

        updatedCourse[event.field] = event.props.value;
        
        CourseService.updateCourse(updatedCourse)
                .then(res => {
                    setCourses(courses.map(course => {
                        if (course.course_id === res.course_id) {
                            return res;
                        }

                        return course;
                    }))
                });
    }
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
                    onSelectionModelChange={newSelection => setDeletedCourses(newSelection.selectionModel)}
                    onEditCellChangeCommitted={handleEditCellChangeCommitted}
                />
            </Paper> 
            <Button variant="contained" color="primary" onClick={deleteCourses}>
                Delete
            </Button>
        </div>
    );
}

export default CoursesTeacher;