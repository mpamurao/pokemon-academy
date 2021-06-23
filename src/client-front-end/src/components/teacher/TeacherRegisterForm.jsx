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
        if (input === "firstName") {
            this.setState({first_name: event.target.value});
        }
        if (input === "lastName") {
            this.setState({last_name:event.target.value});
        }
        if (input === "email") {
            this.setState({email:event.target.value});
        }
        if (input === "password") {
            this.setState({password:event.target.value});
        }
        if (input === "department") {
            this.setState({department:event.target.value});
        }
        if (input === "employeeTitle") {
            this.setState({employee_title:event.target.value});
        }
    }

    createAccount = () => {        
         TeacherService
            .addTeacher(this.state)
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
                    <TextField required error={!this.state.first_name && !this.state.validRequest} 
                        id="teacher-firstName" label="First Name" className={classes.formFields}
                        variant="outlined" value={this.state.first_name} 
                        onChange={event => this.handleChange(event, "firstName")} />
                    <TextField required error={!this.state.last_name && !this.state.validRequest} 
                        id="teacher-lastName" label="Last Name" className={classes.formFields}
                        variant="outlined" value={this.state.last_name} 
                        onChange={event => this.handleChange(event, "lastName")} />
                    <TextField required error={!this.state.email && !this.state.validRequest}
                        id="teacher-email" label="Email" className={classes.formFields}
                        variant="outlined" value={this.state.email} 
                        onChange={event => this.handleChange(event, "email")} />
                    <TextField required error={!this.state.password && !this.state.validRequest}
                        id="teacher-password" label="Password" className={classes.formFields}
                        variant="outlined" value={this.state.password} 
                        onChange={event => this.handleChange(event, "password")} />
                    <TextField required error={!this.state.department && !this.state.validRequest}
                        id="teacher-department" label="Department" className={classes.formFields}
                        variant="outlined" value={this.state.department} 
                        onChange={event => this.handleChange(event, "department")} />
                    <TextField required error={!this.state.employee_title && !this.state.validRequest}
                        id="teacher-title" label="Employee Title" className={classes.formFields}
                        variant="outlined" value={this.state.employee_title} 
                        onChange={event => this.handleChange(event, "employeeTitle")} />
                    <Button onClick={this.createAccount} className={classes.buttonSubmit}>Create Account</Button>
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

export default TeacherRegisterForm;