import React, {useState} from 'react';
import TeacherService from '../../service/TeacherService';
import {Container,Checkbox, Button, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Paper} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useEffect } from 'react';
import CourseService from '../../service/CourseService';

function CoursesTeacher(props) {
    const {email} = props;
    const [courses, setCourses] = useState([]);
    const [warning, setWarning] = useState("");
    const [headCells, setHeadCells] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");

    useEffect(() => {
        if (!email) {
            setWarning("No email provided.");
            return;
        }

        TeacherService.getCoursesByTeacher(email)
            .then(res => {
                if (res === "bad request") {
                    return;
                }
                console.log(res)
                const response = res.data;
                setCourses(response);
                console.log(response);
                if (response[0]) {
                    setHeadCells(Object.keys(response[0]))

                }
                console.log(headCells);
            })
            
        
    }, []);

    const deleteCourse = (course_id) => {
        CourseService.deleteCourse(course_id)
        .then(res => console.log(res));
    }
    
    return (
        <div>
            {warning === "No email provided." ? <Typography>{warning}</Typography> : ""}

            <TableContainer component={Paper}>
                <Table aria-label="teacher's courses">
                    <TableHead>
                        <TableRow>
                            <Checkbox />
                            {
                                headCells.map(header => {
                                    if (header === "students" || header === "teachers") {
                                        return;
                                    }
                                    return <TableCell>{header}&nbsp;</TableCell>
                                })
                            }
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {courses.map(row => {
                                console.log(row.course_id);
                                return <TableRow key={row.course_id}>
                                    <Checkbox />
                                    <TableCell component="th" scope="row">
                                        {row.course_id}
                                    </TableCell>
                                    <TableCell align="center">{row.course_name}</TableCell>
                                    <TableCell align="center">{row.course_description}</TableCell>
                                    <TableCell align="center">{row.department}</TableCell>
                                    <TableCell align="center">{row.course_size}</TableCell>
                                    <TableCell align="center"><Button onClick={() => {deleteCourse(row.course_id)}}><DeleteForeverIcon /></Button></TableCell>
                                </TableRow>
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </div>
    );
}

export default CoursesTeacher;