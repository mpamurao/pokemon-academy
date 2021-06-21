import React, { Component } from 'react';
import {Container, Button, withStyles, FormControl, InputLabel, TextField, Input} from '@material-ui/core';


class StudentLoginForm extends Component {
    render() {
        return (
            <div>
                Login:
                <TextField required id="student-email" label="Email" 
                    variant="outlined" value={this.props.email} 
                    onChange={event => this.props.handleChange(event, "email")} />
                <TextField required id="student-password" label="Password" 
                    variant="outlined" value={this.props.password} 
                    onChange={event => this.props.handleChange(event, "password")} />
                <Button type="submit">Submit</Button>
            </div>
        );
    }
}

export default StudentLoginForm;