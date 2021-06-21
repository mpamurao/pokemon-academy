import React, { Component } from 'react';
import homeStyles from '../styles/homeStyles';
import {Container, Button, withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.welcomePage}>
                <Container className={classes.welcome}>
                    WELCOME TO THE POKEMON TRAINING ACADEMY
                </Container>
                
                <Container className={classes.pickIdentity}>
                    <p>Please choose a portal:</p>
                    <Link to={{
                            pathname:"/student", 
                            state:{identity:"student"}}}>
                        <Button className={classes.identity}>
                            Student
                        </Button>
                    </Link>
                    <Link to={{
                        pathname:"/teacher", 
                        state:{identity:"teacher"}}}>
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