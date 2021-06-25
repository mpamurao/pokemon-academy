import React, {useState} from 'react';
import TeacherService from '../../service/TeacherService';
import {Container, Button, Typography,  Paper} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import CourseService from '../../service/CourseService';
import { KeyboardReturnTwoTone } from '@material-ui/icons';

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

        setHeadCells(["course_id", "course_name", "description", "department", "course_size"]);
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

        return {field: header, headerName:header, width:200, editable: true}
        
    })

    const rows = courses.map(course =>({
            id: course.course_id,
            course_id: course.course_id,
            course_name: course.course_name,
            description: course.course_description,
            department: course.department,
            course_size: course.course_size

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

    return (
        <div style={{width: "100vw", border:"1px solid black"}}>
            {warning === "No email provided." ? <Typography>{warning}</Typography> : ""}
            <Paper style={{ height: 400, width: '100%' }}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    hideFooterPagination
                    // onRowSelected={handleRowSelection}
                    onSelectionModelChange={newSelection => setDeletedCourses(newSelection.selectionModel)}
                    // selectionModel={courses}
                />
                <Button variant="contained" color="primary" onClick={deleteCourses}>
                    Delete
                </Button>
            </Paper>





























            
        </div>
    );
}

export default CoursesTeacher;