import React, { Component } from 'react';
import {Container, Button} from '@material-ui/core';
import CreateCourse from './CreateCourse';
import CoursesTeacher from './CoursesTeacher';

class TeacherClassRoster extends Component {
    constructor(props) {
        super(props)

        this.state = {
            viewMode: "view",
            email:"",
        }
    }
    
    componentDidMount() {
        this.setState({email:this.props.email, viewMode:"viewCourse"});
    }

    changeView = (viewMode) => {
        this.setState({viewMode});
    }

    render() {
        const viewCourse = "viewCourse";
        const createCourse = "createCourse";
        return (
            <div>
                <Container>
                    <Button onClick={() => this.changeView(viewCourse)}>
                        View Courses
                    </Button>
                    <Button onClick={() => this.changeView(createCourse)}>
                        Create New Course
                    </Button>
                </Container>

                {/* create a new course or show courses that teacher has */}
                {this.state.viewMode === createCourse 
                    ? <CreateCourse email={this.state.email} /> 
                        : this.state.viewMode === viewCourse
                            ? <CoursesTeacher email={this.state.email} courseListUpdated={this.courseListUpdated}/>
                            : ""}

            </div>
        );
    }
}

export default TeacherClassRoster;
