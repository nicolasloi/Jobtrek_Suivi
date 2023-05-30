import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const credentials = {
            email: email,
            password: password,
        };

        // Envoie de la requête POST vers ton backend
        axios
            .post(process.env.REACT_APP_API_URL_USER_LOGIN, credentials)
            .then((response) => {
                // Récupération du token depuis la réponse
                const token = response.data.token;
                // Effectue les actions nécessaires avec le token (par exemple, le stocker dans le state global ou dans le localStorage)
                console.log('Token:', token);
            })
            .catch((error) => {
                // Gère les erreurs ici (par exemple, affiche un message d'erreur)
                console.error('Une erreur s\'est produite:', error);
            });
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
