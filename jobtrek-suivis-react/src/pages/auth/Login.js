import React, { Component } from 'react';
import '../../App';
import {Button, Card, CardActions, CardContent, Grid, TextField, Typography} from '@mui/material';
import * as PropTypes from "prop-types";

CardActions.propTypes = {children: PropTypes.node};

class Login extends Component {
    constructor() {
        super();

        this.state = {
            Email: '',
            Password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    login(event) {
        event.preventDefault();

        fetch('http://localhost:51282/Api/login/Login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: this.state.Email,
                Password: this.state.Password
            })
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.Status === 'Invalid') {
                    alert('Invalid User');
                } else {
                    this.props.history.push('/Dashboard');
                }
            });
    }

    render() {
        return (
            <div className="app">
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div" align="center" gutterBottom>
                                    Login
                                </Typography>
                                <form>
                                    <Grid container spacing={2}>
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
                                    </Grid>
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.login}
                                    fullWidth
                                >
                                    Login
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Login;
