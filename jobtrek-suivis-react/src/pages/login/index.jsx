import { setAuthToken } from "../../components/setAuthToken";
import axios from "axios";
import {Box, Button, TextField, Typography} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.svg";
import Grid from "@mui/material/Grid";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginPayload = {
            email: email,
            password: password,
        };

        if (password.length < 8) {
            setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        axios
            .post(process.env.REACT_APP_API_URL_USER_LOGIN, loginPayload)
            .then((response) => {
                const { token, user } = response.data;

                localStorage.setItem("token", token);
                setAuthToken(token);

                setUser(user);

                navigate("/");
            })
            .catch((err) => {
                setLoginError("Email ou mot de passe incorrect.");
            });
    };

    const handleEmailChange = (event) => {
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);

        if (!isValidEmail(enteredEmail)) {
            setEmailError("Adresse e-mail invalide.");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (event) => {
        const enteredPassword = event.target.value;
        setPassword(enteredPassword);

        if (enteredPassword.length < 8) {
            setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
        } else {
            setPasswordError("");
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@jobtrek\.ch$/;
        return emailRegex.test(email);
    };

    return (
        <div>
            <Grid container sx={{ height: "100vh" }}>
                {/* Colonne de gauche */}
                <Grid item xs={12} md={6} sx={{ backgroundColor: "#FFFFFF" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            padding: "2rem",
                            maxWidth: "400px",
                            margin: "0 auto",
                        }}
                    >
                        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <Typography variant="h3" sx={{ marginBottom: "2rem" }}>
                                Connectez-vous à votre compte
                            </Typography>

                            <TextField
                                type="email"
                                label="Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                error={!!emailError}
                                helperText={emailError}
                                fullWidth
                                style={{ marginBottom: "1.5rem" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                error={!!passwordError}
                                helperText={passwordError}
                                style={{ marginBottom: "1.5rem" }}
                                sx={{ backgroundColor: "#FFFFFF" }}
                            />
                            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: "15px",
                                    lineHeight: "22px",
                                    color: "#FFFFFF",
                                    padding: "8px 22px",
                                }}
                            >
                                Login
                            </Button>
                        </form>
                    </Box>
                </Grid>

                {/* Colonne de droite */}
                <Grid item xs={12} md={6} sx={{ backgroundColor: "#1C2536" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <img src={logo} alt="Logo" style={{ width: "35%" }} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;
