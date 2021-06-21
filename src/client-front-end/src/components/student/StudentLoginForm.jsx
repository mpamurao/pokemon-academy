import React, { Component } from 'react';
import {Container, Button, TextField} from '@material-ui/core';
import StudentService from '../../service/StudentService';


class StudentLoginForm extends Component {
    constructor() {
        super()

        this.state = {
            validRequest: "",
        }
    }

    clickEnter = () => {
        StudentService
            .verify(this.props.email, this.props.password)
            .then(res => {
                if (res === "logging in") {
                    window.history.pushState({email: this.props.email},'', "/student/portal");
                    window.location.reload();
                }
            });

        // if invalid authentication
        this.setState({validRequest: false});
    }

    render() {
        return (
            <div>
                Login:
                <TextField required id="student-email" label="Email" 
                    variant="outlined" value={this.props.email} 
                    onChange={event => this.props.handleChange(event, "email")} />
                <TextField required id="student-password" label="Password" 
                    variant="outlined" value={this.props.password} 
                    onChange={event => this.props.handleChange(event, "password")} />
               
                <Button onClick={this.clickEnter}>Enter</Button>
                {this.state.validRequest === "" 
                    ? "" 
                    : <Container>
                        Invalid email and/or password. Please try again.
                    </Container>
                }
            </div>
        );
    }
}

export default StudentLoginForm;