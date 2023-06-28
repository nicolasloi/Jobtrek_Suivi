import React, { useEffect, useState } from 'react';
import {Box, Typography, useTheme} from '@mui/material';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import {tokens} from "../../theme";

const Dashboard = ({ user }) => {
    const [projets, setProjets] = useState([]);

    useEffect(() => {
        const fetchProjets = async () => {
            try {
                const response = await fetch(`http://localhost:5080/api/userprojets/${user.id}/projects`);
                if (response.ok) {
                    const data = await response.json();
                    setProjets(data);
                } else {
                    console.error('Une erreur s\'est produite lors de la récupération des projets.');
                }
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des projets:', error);
            }
        };

        fetchProjets();
    }, [user]);

    if (!user || !user.username) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box m="20px">
            <Header title="DASHBOARD" subtitle={`Bienvenue sur votre dashboard, ${user.username}`} />
            <Box mt="20px">
                <Typography variant="h4">Vos projets :</Typography>
                {projets.length > 0 ? (
                    projets.map((projet) => (
                        <Box key={projet.idUserProjet} mt="10px">
                            <Typography variant="h6">{projet.projet?.nom_projet}</Typography>
                            <Typography>{projet.projet?.desc_projet}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography>Aucun projet trouvé.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
