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

        setHeadCells(["course_id", "course_name", "course_description", "department", "course_size"]);
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
            return {field: header, headerName:header, width:200, editable: false}
        }

        return {field: header, headerName:header, width:200, editable: true}
        
    })

    const rows = courses.map(course =>({
            id: course.course_id,
            course_id: course.course_id,
            course_name: course.course_name,
            course_description: course.course_description,
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

    const handleEditCellChangeCommitted = (event) => {
        // field: "course_name"
        // id: 58
        // props:
        // value: "b"
        console.log(event);

        // let updatedCourses = courses.map(course => {
        //     if (course.course_id !== event.id) {
        //         return course;
        //     }

        //     if (event.field === "course_size" && isNaN(event.props.value)) {
        //         return course;
                
        //     }

        //     let updatedCourse = {...course};
        //     updatedCourse[event.field] = event.props.value;

        //     CourseService.updateCourse(updatedCourse)
        //         .then(res => )
        //     return updatedCourse;
        // })
        
        // find the course that was modified
        // filter returns a list
        const updatedCourse = courses.filter(course => {
            if (course.course_id === event.id) {
                if (event.field === "course_size" && isNaN(event.props.value)) {
                    return false;
                    
                }
                return true;
            }
        })[0]

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


        // setCourses(updatedCourses);
        // console.log("updated", updatedCourses);
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
                    autoPageSize
                    onSelectionModelChange={newSelection => setDeletedCourses(newSelection.selectionModel)}
                    onEditCellChangeCommitted={handleEditCellChangeCommitted}
                />
                <Button variant="contained" color="primary" onClick={deleteCourses}>
                    Delete
                </Button>
            </Paper>





























            
        </div>
    );
}

export default CoursesTeacher;