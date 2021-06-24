import React, { Component } from 'react';
import TeacherPortalNavBar from '../TeacherPortalNavBar';
import {Container, Typography} from '@material-ui/core';
import TeacherClassRoster from './TeacherClassRoster';

class TeacherPortal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            currentPage:"intro",
        }
    }

    componentDidMount() {
        // console.log("hello", this.props.location.state)
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

        return (
            <div>
                <Container>
                    <Typography>TEACHER PORTAL</Typography>
                    <TeacherPortalNavBar setCurrentPage = {this.setCurrentPage} />

                    {this.state.currentPage === "intro" 
                        ? <Container>Please select an item from the menu</Container>
                        : this.state.currentPage === "classRoster"
                            ? <TeacherClassRoster email={this.state.email} />
                            : <Container>Logging out</Container>
                    }
                </Container>
            </div>
        );
    }

    componentWillUnmount () {
        console.log("unmounting")
        this.setState({email: "", password: ""});
    }
}

export default TeacherPortal;