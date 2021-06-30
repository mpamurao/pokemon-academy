import React, { Component } from 'react';
import {Container, Button, withStyles} from '@material-ui/core';
import CoursesStudent from './CoursesStudent';
import AddCourse from './AddCourse';
import classRosterStyles from '../../styles/classRosterStyles';

class StudentClassRoster extends Component {
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
        const addClass = "addClass";
        return (
            <div>
                <Container disableGutters margin={1}>
                    <Button variant="text" aria-label="view courses"
                        className={this.state.viewMode === "viewCourse" 
                        ? `${classes.buttonFocused}` : `${classes.button}`}
                        onClick={() => this.changeView(viewCourse)}
                    >
                        View Schedule
                    </Button>
                    <Button variant="text" aria-label="create new course"
                        className={this.state.viewMode === "addClass" 
                        ? `${classes.buttonFocused}` : `${classes.button}`}
                        onClick={() => this.changeView(addClass)}
                    >
                        Add A Class
                    </Button>
                </Container>
                <Container className={classes.classView}>
                    {/* create a new course or show courses that student has */}
                    {this.state.viewMode === addClass 
                        ? <AddCourse email={this.state.email} /> 
                            : this.state.viewMode === viewCourse
                                ? <CoursesStudent email={this.state.email} courseListUpdated={this.courseListUpdated}/>
                                : ""}
                </Container>
            </div>
        );
    }
}

export default withStyles(classRosterStyles)(StudentClassRoster);
