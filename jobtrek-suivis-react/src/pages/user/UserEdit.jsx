import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [year, setYear] = useState(0);
    const [metierId, setMetierId] = useState(0);
    const [nomMetier, setNomMetier] = useState('');
    const [roleId, setRoleId] = useState(0);
    const [nomRole, setNomRole] = useState('');

    useEffect(() => {
        // Récupérer les données de l'utilisateur à modifier
        fetch(`http://localhost:5080/api/User/${id}`)
            .then(response => response.json())
            .then(data => {
                setUserData(data);
                setEmail(data.email);
                setPassword(data.password);
                setUsername(data.username);
                setYear(data.year);
                setMetierId(data.metierId);
                setNomMetier(data.metier.nom_metier);
                setRoleId(data.roleId);
                setNomRole(data.role.nom_role);
            })
            .catch(error => {
                console.log('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur:', error);
            });
    }, [id]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleMetierIdChange = (event) => {
        setMetierId(event.target.value);
    };

    const handleNomMetierChange = (event) => {
        setNomMetier(event.target.value);
    };

    const handleRoleIdChange = (event) => {
        setRoleId(event.target.value);
    };

    const handleNomRoleChange = (event) => {
        setNomRole(event.target.value);
    };

    const handleUpdateUser = (event) => {
        event.preventDefault();

        // Effectuer la mise à jour de l'utilisateur avec les nouvelles données
        const updatedUser = {
            email,
            password,
            username,
            year,
            metierId,
            metier: {
                idMetier: userData.metier.idMetier,
                nom_metier: nomMetier,
            },
            roleId,
            role: {
                idRole: userData.role.idRole,
                nom_role: nomRole,
            },
        };

        fetch(`http://localhost:5080/api/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Utilisateur mis à jour avec succès:', data);
                navigate('/user'); // Rediriger vers la liste des utilisateurs après la mise à jour
            })
            .catch(error => {
                console.log('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur:', error);
            });
    };

    return (
        <div>
            <h1>Modifier l'utilisateur {username}</h1>
            <form onSubmit={handleUpdateUser}>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} required />

                <label>Username:</label>
                <input type="text" value={username} onChange={handleUsernameChange} required />

                <label>Year:</label>
                <input type="number" value={year} onChange={handleYearChange} required />

                <label>Metier ID:</label>
                <input type="number" value={metierId} onChange={handleMetierIdChange} required />

                <label>Nom Metier:</label>
                <input type="text" value={nomMetier} onChange={handleNomMetierChange} required />

                <label>Role ID:</label>
                <input type="number" value={roleId} onChange={handleRoleIdChange} required />

                <label>Nom Role:</label>
                <input type="text" value={nomRole} onChange={handleNomRoleChange} required />

                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
};

export default UserEdit;
