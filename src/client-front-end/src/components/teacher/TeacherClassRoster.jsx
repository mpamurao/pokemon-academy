import React, { Component } from 'react';
import {Container, Button} from '@material-ui/core';
import CreateCourse from './CreateCourse';

class TeacherClassRoster extends Component {
    constructor(props) {
        super(props)

        this.state = {
            viewMode: "view",
            email:"",
        }
    }
    
    componentDidMount() {
        this.setState({email:this.props.email});
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
                {this.state.viewMode === "createCourse" ? <CreateCourse email={this.state.email}/> : ""}

            </div>
        );
    }
}

export default TeacherClassRoster;
