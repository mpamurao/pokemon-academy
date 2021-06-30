import React, {useState} from 'react';
import StudentService from '../../service/StudentService';
import {Button, Typography, Paper} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import CourseService from '../../service/CourseService';
import { CropLandscapeSharp } from '@material-ui/icons';

function AddCourse(props) {
    const {email, classes} = props;
    const [courses, setCourses] = useState([]);
    const [headCells, setHeadCells] = useState([]);
    const [addedCourses, setAddedCourses] = useState([]);
    const [classSizeMaxed, setClassSizeMaxed] = useState(false);
    const [validateAddedCourse, setValidateAddedCourse] = useState(false);


    useEffect(() => {
        setValidateAddedCourse(false);
        setClassSizeMaxed(false);
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
            return {field: header, headerName:header, width:150, editable: false,
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

    const addCourseToSchedule = () => {
        StudentService.addCoursesToStudent(email, addedCourses)
            .then(res => {
                // console.log(res)
                if (res.includes("Class is full")) {
                    setClassSizeMaxed(res);
                    return;
                }

                setClassSizeMaxed(false);
                setValidateAddedCourse("Added Course");
                getCourses();
                setAddedCourses([]);
            });
    }

    return (
        <div className={classes.tableDisplay}>
            <Typography className={classes.instructions}> Select classes to add to your class schedule</Typography>
            
            {classSizeMaxed 
                ? <Typography color="error" className={classes.instructions}>
                    {classSizeMaxed}. Please try adding a different course.
                    </Typography> 
                : ""
            }

            {validateAddedCourse
                ? <Typography color="primary" className={classes.instructions}>
                    Successfully added a class to your schedule.
                    </Typography> 
                : ""
            }

            <Paper style={{height: 450}}>
            <DataGrid className={classes.root}            
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    autoPageSize
                    onSelectionModelChange={newSelection => setAddedCourses(newSelection.selectionModel)}
                />
            </Paper>
            <Button variant="contained" color="primary" 
                onClick={addCourseToSchedule} 
                className={classes.buttonTable}>
                    Add to Schedule
            </Button>
        </div>
    );
}

export default AddCourse;