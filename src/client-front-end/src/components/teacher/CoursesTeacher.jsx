import React, {useState} from 'react';
import TeacherService from '../../service/TeacherService';
import {Container,Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Paper} from '@material-ui/core';
import { useEffect } from 'react';

function CoursesTeacher(props) {
    const {email} = props;
    const [courseTable, setCourseTable] = useState([]);
    const [warning, setWarning] = useState("");
    const [headCells, setHeadCells] = useState([]);

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
                setCourseTable(response);
                console.log(response);
                setHeadCells(Object.keys(response[0]))
                console.log(headCells);
            })
            
        
    }, []);

    
    return (
        <div>
            {warning === "No email provided." ? <Typography>{warning}</Typography> : ""}

            <TableContainer component={Paper}>
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
                        </TableRow>
                    </TableHead>
                </Table>
                {/* {!courseTable ? "" : courseTable.map(course => {
                    return <Container></Container>
                })} */}
            </TableContainer>
            
        </div>
    );
}

export default CoursesTeacher;