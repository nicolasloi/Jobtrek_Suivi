import { setAuthToken } from "../../components/setAuthToken";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginPayload = {
            email: email,
            password: password,
        };

        axios
            .post(process.env.REACT_APP_API_URL_USER_LOGIN, loginPayload)
            .then((response) => {
                const token = response.data.token;

                localStorage.setItem("token", token);
                setAuthToken(token);

                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Header />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit">Login</Button>
                </form>
            </Box>
        </div>
    );
}

export default Login;
