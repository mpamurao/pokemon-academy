import React, { Component } from 'react';
import StudentPortalNavBar from './StudentPortalNavBar';
import {Container, Typography, withStyles} from '@material-ui/core';
import StudentClassRoster from './StudentClassRoster';
import teacherPortalStyles from '../../styles/teacherStyles/teacherPortalStyles';

class StudentPortal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            currentPage:"myAccount",
        }
    }

    componentDidMount() {
        if (this.props.location.state) {
            const {state} = this.props.location;
            this.setState({email:state.email});
        }
    }

    setCurrentPage = (currentPage) => {
        // console.log("changing page");
        this.setState({currentPage});
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.portal}>
                <StudentPortalNavBar setCurrentPage={this.setCurrentPage} />
                <Container>
                    {this.state.currentPage === "myAccount" 
                        ? <Container>Please select an item from the menu</Container>
                        : this.state.currentPage === "classSchedule"
                            ? <StudentClassRoster email={this.state.email} classes={classes}/>
                            : <Container>Logging out</Container>
                    }
                </Container>
            </div>
        );
    }

    componentWillUnmount () {
        console.log("unmounting")
        this.setState({email: ""});
    }
}

export default withStyles(teacherPortalStyles)(StudentPortal);