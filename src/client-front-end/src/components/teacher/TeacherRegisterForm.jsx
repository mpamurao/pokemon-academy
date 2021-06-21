import React, { Component } from 'react';
import {Container, Button,TextField} from '@material-ui/core';
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
            validRequest:""
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
        return (
            <div>
                Register:                  
                <TextField required id="teacher-firstName" label="First Name" 
                    variant="outlined" value={this.state.first_name} 
                    onChange={event => this.handleChange(event, "firstName")} />
                <TextField required id="teacher-lastName" label="Last Name" 
                    variant="outlined" value={this.state.last_name} 
                    onChange={event => this.handleChange(event, "lastName")} />
                <TextField required id="teacher-email" label="Email" 
                    variant="outlined" value={this.state.email} 
                    onChange={event => this.handleChange(event, "email")} />
                <TextField required id="teacher-password" label="Password" 
                    variant="outlined" value={this.state.password} 
                    onChange={event => this.handleChange(event, "password")} />
                <TextField required id="teacher-department" label="Department" 
                    variant="outlined" value={this.state.department} 
                    onChange={event => this.handleChange(event, "department")} />
                <TextField required id="teacher-title" label="Employee Title" 
                    variant="outlined" value={this.state.employee_title} 
                    onChange={event => this.handleChange(event, "employeeTitle")} />
                <Button type="submit" onClick={this.createAccount}>Create An Account</Button>
                {this.state.validRequest === "" 
                    ? "" 
                    : !this.state.validRequest 
                        ? <Container>
                            Missing info. Please complete the form.
                        </Container>
                        : <Container>
                            Account created. Please proceed to log in.
                        </Container>
                }
            </div>
        );
    }
}

export default TeacherRegisterForm;