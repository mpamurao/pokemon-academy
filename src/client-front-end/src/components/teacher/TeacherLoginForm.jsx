import React, { Component } from 'react';
import {Container, Button, TextField, FormControl} from '@material-ui/core';
import TeacherService from '../../service/TeacherService';


class TeacherLoginForm extends Component {
    constructor() {
        super()

        this.state = {
            email:"",
            password:"",
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
        console.log(this.state.email, this.state.password)
        TeacherService
            .verify(this.state.email, this.state.password)
            .then(res => {
                if (res === "invalid request") {
                    this.setState({validRequest: false});
                }
                if (res === "logging in") {
                    this.setState({validRequest:true});
                    window.history.pushState({email: this.state.email},'', "/#/teacher/portal");
                    window.location.reload();
                }
            });
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <FormControl className={classes.form}>
                    <TextField required error={!this.state.email && !this.state.validRequest} id="teacher-email" label="Email" 
                        variant="outlined" value={this.state.email} className={classes.formFields}
                        onChange={event => this.handleChange(event, "email")} />
                    <TextField required error={!this.state.password && !this.state.validRequest} id="teacher-password" label="Password" 
                        variant="outlined" value={this.state.password} className={classes.formFields}
                        onChange={event => this.handleChange(event, "password")} />
                
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

export default TeacherLoginForm;