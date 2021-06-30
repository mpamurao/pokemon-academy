import React, { Component } from 'react';
import {Container, withStyles, Typography, ButtonBase} from '@material-ui/core';
import loginPageStyles from '../../styles/loginPageStyles';
import TeacherLoginForm from './TeacherLoginForm';
import TeacherRegisterForm from './TeacherRegisterForm';


class TeacherLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
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

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.welcomePage}>
                <Container className={classes.welcomeBox}>
                    <Container className={classes.welcome}>
                        <Typography variant="h6" gutterBottom>
                            WELCOME TEACHER
                        </Typography>
                    </Container>
                    <Container className={classes.loginPage}>
                        <Container disableGutters style={{borderBottom:"1px solid red"}}>                    
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
                            <TeacherLoginForm classes={classes} />
                            : <TeacherRegisterForm classes={classes}/>   
                        }
                    </Container>
                </Container>
            </div>
        );
    }
}

export default withStyles(loginPageStyles)(TeacherLogin);