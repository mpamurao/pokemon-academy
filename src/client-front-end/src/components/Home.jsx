import React, { Component } from 'react';
import homeStyles from '../styles/homeStyles';
import {Container, Typography, Button, withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.welcomePage}>
                <Container className={classes.welcome}>
                    <Typography variant="h6" gutterBottom>WELCOME TO THE POKEMON TRAINING ACADEMY</Typography>
                    <Typography align="center">Please choose a portal:</Typography>
                </Container>
                
                <Container className={classes.pickIdentity}>
                    <Link style={{textDecoration:"none"}} 
                        to={{
                            pathname:"/student", 
                            state:{identity:"student"}}}
                    >
                        <Button className={classes.identity}>
                            Student
                        </Button>
                    </Link>
                    <Link style={{textDecoration:"none"}} 
                        to={{
                            pathname:"/teacher", 
                            state:{identity:"teacher"}}}
                    >
                        <Button className={classes.identity}>
                            Employee
                        </Button>
                    </Link>
                </Container>


            </div>
        );
    }
}

export default withStyles(homeStyles)(Home);