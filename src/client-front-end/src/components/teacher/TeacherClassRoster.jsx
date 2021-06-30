import React, { Component } from 'react';
import {Container, Button, withStyles} from '@material-ui/core';
import CreateCourse from './CreateCourse';
import CoursesTeacher from './CoursesTeacher';
import classRosterStyles from '../../styles/classRosterStyles';

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
        const {classes} = this.props;
        const viewCourse = "viewCourse";
        const createCourse = "createCourse";
        return (
            <div>
                <Container disableGutters margin={1}>
                    <Button variant="text" aria-label="view courses"
                        className={this.state.viewMode === "viewCourse" 
                        ? `${classes.buttonFocused}` : `${classes.button}`}
                        onClick={() => this.changeView(viewCourse)}
                    >
                        View Courses
                    </Button>
                    <Button variant="text" aria-label="create new course"
                        className={this.state.viewMode === "createCourse" 
                        ? `${classes.buttonFocused}` : `${classes.button}`}
                        onClick={() => this.changeView(createCourse)}
                    >
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

export default withStyles(classRosterStyles)(TeacherClassRoster);
