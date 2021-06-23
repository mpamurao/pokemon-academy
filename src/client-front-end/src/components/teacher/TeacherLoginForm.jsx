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
        TeacherService
            .verify(this.props.email, this.props.password)
            .then(res => {
                if (res === "invalid request") {
                    this.setState({validRequest: false});
                }
                if (res === "logging in") {
                    this.setState({validRequest:true});
                    window.history.pushState({email: this.props.state.email},'', "/#/teacher/portal");
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
                        variant="outlined" value={this.props.email} className={classes.formFields}
                        onChange={event => this.handleChange(event, "email")} />
                    <TextField required error={!this.state.password && !this.state.validRequest} id="teacher-password" label="Password" 
                        variant="outlined" value={this.props.password} className={classes.formFields}
                        onChange={event => this.handleChange(event, "password")} />
                
                    <Button onClick={this.clickEnter} className={classes.buttonSubmit}>Enter</Button>
                    {this.state.validRequest === "" 
                        ? "" 
                        : !this.state.validRequest 
                            ? <Container>
                                <b>Invalid email and/or password. Please try again.</b>
                            </Container>
                            : <Container><b>Logging in...</b></Container>
                    }
                </FormControl>
            </div>
        );
    }
}

export default TeacherLoginForm;