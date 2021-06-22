import React, { Component } from 'react';
import TeacherPortalNavBar from '../TeacherPortalNavBar';
import {Container} from '@material-ui/core';
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
        console.log("portal mount")
        if (this.props.location.state) {
            const {state} = this.props.location;
            this.setState({email:state.email});
        }
    }

    setCurrentPage = (currentPage) => {
        console.log("changing page");
        this.setState({currentPage});
    }

    render() {
        return (
            <div>
                TEACHER PORTAL
                <TeacherPortalNavBar  setCurrentPage = {this.setCurrentPage} />

                {this.state.currentPage === "intro" 
                    ? <Container>Please select what to do</Container>
                    : this.state.currentPage === "classRoster"
                        ? <TeacherClassRoster />
                        : <Container>Logging out</Container>
                }
            </div>
        );
    }

    componentWillUnmount () {
        console.log("unmounting")
        this.setState({email: "", password: ""});
    }
}

export default TeacherPortal;