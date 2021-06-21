import React, { Component } from 'react';
import {Container, Button,TextField} from '@material-ui/core';
import StudentService from '../../service/StudentService';

class StudentRegisterForm extends Component {
    constructor() {
        super()

        this.state = {
            first_name:"",
            last_name:"",
            grade_level:"",
            major:"",
            minor:"",
            email:"",
            password:"",
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
        if (input === "gradeLevel") {
            this.setState({grade_level:event.target.value});
        }
        if (input === "major") {
            this.setState({major:event.target.value});
        }
        if (input === "minor") {
            this.setState({minor:event.target.value});
        }
        if (input === "email") {
            this.setState({email:event.target.value});
        }
        if (input === "password") {
            this.setState({password:event.target.value});
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
        return (
            <div>
                Register:                  
                <TextField required id="student-firstName" label="First Name" 
                    variant="outlined" value={this.state.first_name} 
                    onChange={event => this.handleChange(event, "firstName")} />
                <TextField required id="student-lastName" label="Last Name" 
                    variant="outlined" value={this.state.last_name} 
                    onChange={event => this.handleChange(event, "lastName")} />
                <TextField required id="student-gradeLevel" label="Grade Level" 
                    variant="outlined" value={this.state.grade_level} 
                    onChange={event => this.handleChange(event, "gradeLevel")} />
                <TextField required id="student-major" label="Major" 
                    variant="outlined" value={this.state.major} 
                    onChange={event => this.handleChange(event, "major")} />
                <TextField required id="student-minor" label="Minor" 
                    variant="outlined" value={this.state.minor} 
                    onChange={event => this.handleChange(event, "minor")} />
                <TextField required id="student-email" label="Email" 
                    variant="outlined" value={this.state.email} 
                    onChange={event => this.handleChange(event, "email")} />
                <TextField required id="student-password" label="Password" 
                    variant="outlined" value={this.state.password} 
                    onChange={event => this.handleChange(event, "password")} />
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

export default StudentRegisterForm;