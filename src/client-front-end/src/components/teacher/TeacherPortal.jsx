import React, { Component } from 'react';

class TeacherPortal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }
    }

    componentDidMount() {
        console.log("portal mount")
        if (this.props.location.state) {
            const {state} = this.props.location;
            this.setState({email:state.email});
        }
    }

    render() {
        return (
            <div>
                TEACHER PORTAL
            </div>
        );
    }
}

export default TeacherPortal;