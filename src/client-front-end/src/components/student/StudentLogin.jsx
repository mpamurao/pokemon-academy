import React, { Component } from 'react';
import {Container, ButtonBase, withStyles, Typography} from '@material-ui/core';
import loginPageStyles from '../../styles/loginPageStyles';
import StudentLoginForm from './StudentLoginForm';
import StudentRegisterForm from './StudentRegisterForm';

class StudentLogin extends Component {
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
            <div>
                <Container className={classes.welcome}>
                    <Typography variant="h6" gutterBottom>
                        WELCOME STUDENT
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
                        <StudentLoginForm classes={classes} />
                        : <StudentRegisterForm classes={classes}/>
                        
                    }
                </Container>
            </div>
        );
    }
}

export default withStyles(loginPageStyles)(StudentLogin);