import React, { Component } from 'react';
import {Container, Button, TextField, FormControl} from '@material-ui/core';
import StudentService from '../../service/StudentService';
import {withRouter} from 'react-router';

class StudentLoginForm extends Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
            validRequest: "",
        }
    }

    // handleChange for login form
    handleChange = (event, input) => {
        event.preventDefault();

        if (input === "email") {
            this.setState({email:event.target.value});
        }
        if (input === "password") {
            this.setState({password:event.target.value});
        }
    }

    clickEnter = () => {
        StudentService
            .verify(this.state.email, this.state.password)
            .then(res => {
                if (res === "invalid request") {
                    this.setState({validRequest: false});
                }
                if (res === "logging in") {
                    this.setState({validRequest:true});
                    this.props.history.push({
                        pathname: "/student/portal",
                        state: {email:this.state.email}
                    })
                }
            });
    }

    onKeyPress = event => {
        if (event.key === 'Enter') {
            this.clickEnter();
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <FormControl className={classes.form}>
                    <TextField required error={!this.state.email && !this.state.validRequest}
                        id="student-email" label="Email" className={classes.formFields}
                        variant="outlined" value={this.state.email} 
                        onChange={event => this.handleChange(event, "email")} />
                    <TextField required error={!this.state.password && !this.state.validRequest}
                        id="student-password" label="Password" className={classes.formFields}
                        variant="outlined" value={this.state.password} 
                        onChange={event => this.handleChange(event, "password")} onKeyPress={this.onKeyPress} />
                
                    <Button onClick={this.clickEnter} className={classes.buttonSubmit}>Enter</Button>
                </FormControl>
                {this.state.validRequest === "" 
                    ? "" 
                    : !this.state.validRequest 
                        ? <Container className={classes.notice}>
                            Invalid email and/or password. Please try again.
                        </Container>
                        : <Container className={classes.notice}>
                            Logging in...
                        </Container>
                }
            </div>
        );
    }
}

export default withRouter(StudentLoginForm);