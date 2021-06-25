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
                    <Typography variant="h6" gutterBottom>
                        WELCOME TO THE POKEMON TRAINING ACADEMY
                    </Typography>
                    <Typography style={{fontSize:"14pt"}}>
                        Please choose a portal:
                    </Typography>
                </Container>
                
                <Container className={classes.pickIdentity}>
                    <Link style={{textDecoration:"none"}} 
                        to={"/student"}
                    >
                        <Button className={classes.identity} variant="outlined">
                            Student
                        </Button>
                    </Link>
                    <Link style={{textDecoration:"none"}} 
                        to={"/teacher"}
                    >
                        <Button className={classes.identity} variant="outlined">
                            Teacher
                        </Button>
                    </Link>
                </Container>
            </div>
        );
    }
}

export default withStyles(homeStyles)(Home);