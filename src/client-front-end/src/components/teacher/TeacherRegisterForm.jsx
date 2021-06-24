import React, { Component } from 'react';
import {Container, Button,TextField, FormControl} from '@material-ui/core';
import TeacherService from '../../service/TeacherService';


class TeacherRegisterForm extends Component {
    constructor() {
        super()

        this.state = {
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            department:"",
            employee_title:"",
            validRequest:"",
        }
    }

    handleChange = (event, input) => {
        event.preventDefault();
        const textFields =
            ["first_name", "last_name", "department", "employee_title", "email", "password"];

        for (let i = 0; i < textFields.length; i++) {
            if (textFields[i] === input) {
                this.setState({[input]: event.target.value});
            }
        }
    }

    createAccount = () => {        
         TeacherService
            .addTeacher(this.state)
            .then(res => {
                if (res === "Email already exists") {
                    this.setState({validRequest: res});
                }
                if (res.error === "Bad Request") {
                    this.setState({validRequest: res.error});
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
                            id="teacher-firstName" label="First Name" className={classes.formFields}
                            variant="outlined" value={this.state.first_name} 
                            onChange={event => this.handleChange(event, "first_name")} />
                        <TextField required error={!this.state.last_name && !this.state.validRequest} 
                            id="teacher-lastName" label="Last Name" className={classes.formFields}
                            variant="outlined" value={this.state.last_name} 
                            onChange={event => this.handleChange(event, "last_name")} />
                        <TextField required error={!this.state.department && !this.state.validRequest}
                            id="teacher-department" label="Department" className={classes.formFields}
                            variant="outlined" value={this.state.department} 
                            onChange={event => this.handleChange(event, "department")} />
                        <TextField required error={!this.state.employee_title && !this.state.validRequest}
                            id="teacher-title" label="Employee Title" className={classes.formFields}
                            variant="outlined" value={this.state.employee_title} 
                            onChange={event => this.handleChange(event, "employee_title")} />
                        <TextField required error={!this.state.email && !this.state.validRequest}
                            id="teacher-email" label="Email" className={classes.formFields}
                            variant="outlined" value={this.state.email} 
                            onChange={event => this.handleChange(event, "email")} />
                        <TextField required error={!this.state.password && !this.state.validRequest}
                            id="teacher-password" label="Password" className={classes.formFields}
                            variant="outlined" value={this.state.password} 
                            onChange={event => this.handleChange(event, "password")} />
                    </Container>
                    <Container>
                        <Button onClick={this.createAccount} className={classes.buttonSubmit}>
                            Create Account
                        </Button>
                    </Container>
                </FormControl>

                {this.state.validRequest === true
                    ? <Container className={classes.notice}>
                        Account created. Please proceed to log in.
                    </Container>
                    : this.state.validRequest === "Bad Request"
                        ? <Container className={classes.notice}>
                            There was an error processing your application. Please try again.
                        </Container>
                        : this.state.validRequest === "Email already exists"
                            ? <Container className={classes.notice}>
                                Email already exists. Please log in with existing email.
                            </Container>
                                : ""
                                
                }
                
            </div>
        );
    }
}

export default TeacherRegisterForm;