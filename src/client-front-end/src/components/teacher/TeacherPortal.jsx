import React, { Component } from 'react';
import TeacherPortalNavBar from './TeacherPortalNavBar';
import {Container, Typography, withStyles} from '@material-ui/core';
import TeacherClassRoster from './TeacherClassRoster';
import teacherPortalStyles from '../../styles/teacherStyles/teacherPortalStyles';

class TeacherPortal extends Component {
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
                <TeacherPortalNavBar setCurrentPage={this.setCurrentPage} />
                <Container>
                    {this.state.currentPage === "myAccount" 
                        ? <Container>Please select an item from the menu</Container>
                        : this.state.currentPage === "classRoster"
                            ? <TeacherClassRoster email={this.state.email} classes={classes}/>
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

export default withStyles(teacherPortalStyles)(TeacherPortal);