import React, { Component } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
    TextField,
    Typography
} from '@mui/material';

class Reg extends Component {
    constructor() {
        super();
        this.state = {
            EmployeeName: '',
            City: '',
            Email: '',
            Password: '',
            Department: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    register(event) {
        event.preventDefault();

        fetch('http://localhost:51282/Api/login/InsertEmployee', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeName: this.state.EmployeeName,
                Password: this.state.Password,
                Email: this.state.Email,
                City: this.state.City,
                Department: this.state.Department
            })
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.Status === 'Success') {
                    this.props.history.push('/Dashboard');
                } else {
                    alert('Sorry!!!! Unauthenticated User!!!!');
                }
            });
    }

    render() {
        return (
            <div className="app">
                <Grid container justify="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div" align="center" gutterBottom>
                                    Sign Up
                                </Typography>
                                <form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="EmployeeName"
                                                label="Enter Employee Name"
                                                fullWidth
                                                value={this.state.EmployeeName}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="Email"
                                                type="email"
                                                label="Enter Email"
                                                fullWidth
                                                value={this.state.Email}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="Password"
                                                type="password"
                                                label="Enter Password"
                                                fullWidth
                                                value={this.state.Password}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="City"
                                                label="Enter City"
                                                fullWidth
                                                value={this.state.City}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="Department"
                                                label="Enter Department"
                                                fullWidth
                                                value={this.state.Department}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.register}
                                    fullWidth
                                >
                                    Create Account
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Reg;
