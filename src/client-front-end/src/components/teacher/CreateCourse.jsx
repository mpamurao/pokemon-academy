import { FormControl, TextField, Button, Container, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import CourseService from '../../service/CourseService';
import portalStyles from '../../styles/portalStyles';

class CreateCourse extends Component {
    constructor(props) {
        super(props)

        this.state = {
            course_name: "",
            course_description: "",
            course_size: "",
            department: "",
            email:"",
            validRequest:"",
            sizeDataTypeValid:"initial",
        }
    }

    componentDidMount() {
        this.setState({email:this.props.email});
    }

    handleChange = (event, input) => {
        event.preventDefault();
        const inputOptions = 
            ["course_name", "course_description", "course_size", "department"];
        
        for (let i = 0; i < inputOptions.length; i++) {
            if (inputOptions[i] === input) {
                this.setState({[input]: event.target.value});
            }
        }
    }

    createClass = () => {
        if ((this.state.course_size.length > 0) && 
                isNaN(parseInt(this.state.course_size))) {
            console.log(this.state.course_size)
            this.setState({sizeDataTypeValid: false, validRequest:false});
            return;
        }

        const data = {
            courseModel: {
                course_name: this.state.course_name,
                course_description: this.state.course_description,
                course_size: this.state.course_size,
                department: this.state.department,
            },
            email:this.state.email,
        }

        CourseService.createCourse(data)
            .then(res => {
                if (res === "bad request") {
                    this.setState({validRequest: false, sizeDataTypeValid:"initial"});
                }
                if (res === "course created") {
                    this.setState({validRequest:true, sizeDataTypeValid:"initial"});
                }
            });
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <FormControl>
                {/* course_id, course_name, course_size, department */}
                    <TextField required error={!this.state.validRequest && !this.state.course_name} 
                        id="courseName" label="Course Name" 
                        variant="outlined" value={this.state.course_name} 
                        onChange={event => this.handleChange(event, "course_name")} />
                    <TextField required error={!this.state.validRequest && !this.state.course_description}
                        id="courseId" label="Course Description" 
                        variant="outlined" value={this.state.course_description} 
                        onChange={event => this.handleChange(event, "course_description")} />
                    <TextField required error={!this.state.validRequest && !this.state.course_size}
                        id="courseSize" label="Course Size" 
                        variant="outlined" value={this.state.course_size} 
                        onChange={event => this.handleChange(event, "course_size")} />
                    <TextField required error={!this.state.validRequest && !this.state.department}
                        id="department" label="Department" 
                        variant="outlined" value={this.state.department} 
                        onChange={event => this.handleChange(event, "department")} />
                    <Button type="submit" onClick={this.createClass}>
                        Create Class
                    </Button>

                    {this.state.validRequest === "" 
                        ? "" 
                        : !this.state.sizeDataTypeValid
                            ? <Container className={classes.notice}>
                                Please enter a number for Course Size.
                            </Container>
                            : !this.state.validRequest 
                                ? <Container className={classes.notice}>
                                    Missing info. Please complete the form.
                                </Container>
                                : <Container className={classes.notice}>
                                    Course created successfully.
                                </Container>
                    }
                </FormControl>
            </div>
        );
    }
}

export default withStyles(portalStyles)(CreateCourse);