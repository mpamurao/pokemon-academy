import React, { Component } from 'react';
import {Container, Button, withStyles, FormControl} from '@material-ui/core';
import loginPageStyles from '../../styles/loginPageStyles';
import StudentLoginForm from './StudentLoginForm';
import StudentRegisterForm from './StudentRegisterForm';

class StudentLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // identity = student
            identity:"",
            email: "",
            password: "",
            form:"login",
        }
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({identity:this.props.location.state.identity});
        }
    }

    signUp = () => {
        this.setState({form:"register"});
    }

    login = () => {
        this.setState({form:"login"});
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

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Container className={classes.welcome}>
                    WELCOME STUDENT
                </Container>
                <Container>
                    <FormControl className={classes.studentLogin} >
                        <Button type="submit" onClick={this.login}> Log In </Button>
                        <Button type="submit" onClick={this.signUp}> Sign Up </Button>

                        {this.state.form === "login" ? 
                            <StudentLoginForm email={this.state.email} password={this.state.password} 
                                handleChange={this.handleChange} />
                            : <StudentRegisterForm />
                            
                        }
                    </FormControl> 
                </Container>
            </div>
        );
    }
}

export default withStyles(loginPageStyles)(StudentLogin);