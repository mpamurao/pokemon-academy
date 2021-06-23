import React, { Component } from 'react';
import {Container, withStyles, Typography, ButtonBase} from '@material-ui/core';
import loginPageStyles from '../../styles/loginPageStyles';
import TeacherLoginForm from './TeacherLoginForm';
import TeacherRegisterForm from './TeacherRegisterForm';


class TeacherLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // identity = teacher
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
                    <Typography variant="h6" gutterBottom>
                        WELCOME {this.state.identity.toUpperCase()}
                    </Typography>
                </Container>
                <Container className={classes.loginPage}>
                    <Container style={{borderBottom:"1px solid red"}}>                    
                        <ButtonBase variant="text" onClick={this.login} 
                            className={this.state.form === "login" 
                                ? `${classes.buttonFocused}` : `${classes.button}`}
                        >
                            Login
                        </ButtonBase>
                        <ButtonBase variant="text" onClick={this.signUp} 
                            className={this.state.form === "register" 
                                ? `${classes.buttonFocused}` : `${classes.button}`}
                        >
                            Sign Up
                        </ButtonBase>
                    </Container>
                    
                    {this.state.form === "login" ? 
                        <TeacherLoginForm state={this.state} classes={classes}
                            handleChange={this.handleChange} />
                        : <TeacherRegisterForm classes={classes}/>
                        
                    }
                </Container>
            </div>
        );
    }
}

export default withStyles(loginPageStyles)(TeacherLogin);