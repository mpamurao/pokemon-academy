import React, {useState} from 'react';
import TeacherService from '../../service/TeacherService';
import {Container,Checkbox, Button, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Paper, FormControlLabel} from '@material-ui/core';
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
                console.log(res)
                const response = res.data;
                setCourses(response);
                console.log(response);
            });
    }

    const deleteCourse = (course_id) => {
        CourseService.deleteCourse(course_id)
        .then(res => {
            console.log(res);
            getCoursesByTeacher();
        });
    }
    
    const columns = headCells.map(header => {
        console.log(header);

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

    return (
        <div style={{width: "100vw", border:"1px solid black"}}>
            {console.log(columns)}
            {console.log(rows)}
            {warning === "No email provided." ? <Typography>{warning}</Typography> : ""}
            <Container style={{ height: 400, width: '100%' }}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Container>








































            {/* <TableContainer component={Paper}>
                <Table aria-label="teacher's courses">
                    <TableHead>
                        <TableRow>
                            {
                                headCells.map(header => {
                                    if (header === "students" || header === "teachers") {
                                        return;
                                    }
                                    return <TableCell>{header}&nbsp;</TableCell>
                                })
                            }
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            courses.map(row => {
                                console.log(row.course_id);
                                return <TableRow key={row.course_id}>
                                    <TableCell component="th" scope="row" align="center">{row.course_id}</TableCell>
                                    <TableCell align="center">{row.course_name}</TableCell>
                                    <TableCell align="center">{row.course_description}</TableCell>
                                    <TableCell align="center">{row.department}</TableCell>
                                    <TableCell align="center">{row.course_size}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => {deleteCourse(row.course_id)}}>
                                            <DeleteForeverIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer> */}
            
        </div>
    );
}

export default CoursesTeacher;