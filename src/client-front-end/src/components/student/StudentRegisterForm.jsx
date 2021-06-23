import React, { Component } from 'react';
import {Container, Button,TextField, FormControl} from '@material-ui/core';
import StudentService from '../../service/StudentService';

class StudentRegisterForm extends Component {
    constructor() {
        super()

        this.state = {
            first_name:"",
            last_name:"",
            grade_level:"",
            major:"",
            email:"",
            password:"",
            validRequest:""
        }
    }

    handleChange = (event, input) => {
        event.preventDefault();
        const textFields = ["first_name", "last_name", "grade_level", "major", "email", "password"];

        for (let i = 0; i < textFields.length; i++) {
            if (textFields[i] === input) {
                this.setState({[input]: event.target.value});
            }
        }
    }

    createAccount = () => {        
         StudentService
            .addStudent(this.state)
            .then(res => {
                if (res === "bad request") {
                    this.setState({validRequest: false});
                }
                if (res === "account created") {
                    this.setState({validRequest:true});
                }
            });
    }
    
    render() {
        const {classes} = this.props;
        return (
            <div>      
                <FormControl className={classes.form}>  
                    <Container className={classes.subForm}>             
                        <TextField required error={!this.state.first_name && !this.state.validRequest}
                            id="student-firstName" label="First Name" className={classes.formFields}
                            variant="outlined" value={this.state.first_name} 
                            onChange={event => this.handleChange(event, "first_name")} />
                        <TextField required error={!this.state.last_name && !this.state.validRequest}
                            id="student-lastName" label="Last Name" className={classes.formFields}
                            variant="outlined" value={this.state.last_name} 
                            onChange={event => this.handleChange(event, "last_name")} />
                        <TextField required error={!this.state.grade_level && !this.state.validRequest}
                            id="student-gradeLevel" label="Grade Level" className={classes.formFields}
                            variant="outlined" value={this.state.grade_level} 
                            onChange={event => this.handleChange(event, "grade_level")} />
                        <TextField required error={!this.state.major && !this.state.validRequest}
                            id="student-major" label="Major" className={classes.formFields}
                            variant="outlined" value={this.state.major} 
                            onChange={event => this.handleChange(event, "major")} />
                        <TextField required error={!this.state.email && !this.state.validRequest}
                            id="student-email" label="Email" className={classes.formFields}
                            variant="outlined" value={this.state.email} 
                            onChange={event => this.handleChange(event, "email")} />
                        <TextField required error={!this.state.password && !this.state.validRequest}
                            id="student-password" label="Password" className={classes.formFields}
                            variant="outlined" value={this.state.password} 
                            onChange={event => this.handleChange(event, "password")} />
                    </Container>
                    <Container>
                        <Button type="submit" onClick={this.createAccount} className={classes.buttonSubmit}>
                            Create Account
                        </Button>
                    </Container>
                </FormControl>

                {this.state.validRequest === "" 
                    ? "" 
                    : !this.state.validRequest 
                        ? <Container className={classes.notice}>
                            There was an error processing your application. Please try again.
                        </Container>
                        : <Container className={classes.notice}>
                            Account created. Please proceed to log in.
                        </Container>
                }
            </div>
        );
    }
}

export default StudentRegisterForm;