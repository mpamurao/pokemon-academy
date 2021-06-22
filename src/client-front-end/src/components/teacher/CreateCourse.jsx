import { FormControl, TextField, Button, Container } from '@material-ui/core';
import React, { Component } from 'react';
import CourseService from '../../service/CourseService';

class CreateCourse extends Component {
    constructor() {
        super()

        this.state = {
            course_name: "",
            course_description: "",
            course_size: "",
            department: "",
            validRequest:"",
        }
    }

    handleChange = (event, input) => {
        event.preventDefault();
        
        const inputOptions = ["course_name", "course_description", "course_size", "department"];
        for (let i = 0; i < inputOptions.length; i++) {
            if (inputOptions[i] === input) {
                this.setState({[input]: event.target.value});
            }
        }
    }

    createClass = () => {
        CourseService.createCourse(this.state)
            .then(res => {
                if (res === "bad request") {
                    this.setState({validRequest: false});
                }
                if (res === "course created") {
                    this.setState({validRequest:true});
                }
            });
    }

    render() {
        return (
            <div>
                CreatingCourse
                <FormControl>
                {/* course_id, course_name, course_size, department */}
                    <TextField required id="courseName" label="Course Name" 
                        variant="outlined" value={this.state.course_name} 
                        onChange={event => this.handleChange(event, "course_name")} />
                    <TextField required id="courseId" label="Course Description" 
                        variant="outlined" value={this.state.course_description} 
                        onChange={event => this.handleChange(event, "course_description")} />
                    <TextField required id="courseSize" label="Course Size" 
                        variant="outlined" value={this.state.course_size} 
                        onChange={event => this.handleChange(event, "course_size")} />
                    <TextField required id="department" label="Department" 
                        variant="outlined" value={this.state.department} 
                        onChange={event => this.handleChange(event, "department")} />
                    <Button type="submit" onClick={this.createClass}>Create Class</Button>

                    {this.state.validRequest === "" 
                        ? "" 
                        : !this.state.validRequest 
                            ? <Container>
                                Missing info. Please complete the form.
                            </Container>
                            : <Container>
                                Course created successfully.
                            </Container>
                    }
                </FormControl>
            </div>
        );
    }
}

export default CreateCourse;