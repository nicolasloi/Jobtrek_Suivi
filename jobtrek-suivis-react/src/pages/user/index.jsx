import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const User = () => {
    const [userData, setUserData] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL_USER);
                const data = await response.json();
                const userDataWithIds = data.map((user, index) => ({ ...user, id: index + 1 }));
                setUserData(userDataWithIds);
            } catch (error) {
                console.log('Une erreur s\'est produite lors de la récupération des données:', error);
            }
        }

        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {   field: 'metier',
            headerName: 'Métier',
            width: 200,
            valueGetter: (params) => params.row.metier.nom_metier,
        },
        { field: 'username', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'year', headerName: 'Année', width: 100 },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="USER" subtitle="Liste des Users" />
            </Box>
            <DataGrid rows={userData} columns={columns} />
        </Box>
    );
}

export default User;
