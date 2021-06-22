import React, { Component } from 'react';
import {Container, Button} from '@material-ui/core';
import CreateCourse from './CreateCourse';

class TeacherClassRoster extends Component {
    constructor() {
        super()

        this.state = {
            viewMode: "view",
        }
    }

    changeView = (viewMode) => {
        this.setState({viewMode});
    }

    render() {
        return (
            <div>
                <Container>
                    Class Roster
                </Container>
                <Container>
                    <Button onClick={() => this.changeView("viewCourses")}>
                        View Courses
                    </Button>
                    <Button onClick={() => this.changeView("createCourse")}>
                        Create New Course
                    </Button>
                </Container>

                {/* create a new course */}
                {this.state.viewMode === "createCourse" ? <CreateCourse /> : ""}

            </div>
        );
    }
}

export default TeacherClassRoster;
