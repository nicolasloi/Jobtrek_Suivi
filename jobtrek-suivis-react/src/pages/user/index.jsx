import React, {useState, useEffect} from 'react';
import Header from "../../components/Header";
import {Box, Typography, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import CustomButton from "../../components/button";
import {Link} from "react-router-dom";

const User = () => {
    const [userData, setUserData] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL_USER);
                const data = await response.json();
                const userDataWithIds = data.map((user, index) => ({...user, id: index + 1}));
                setUserData(userDataWithIds);
            } catch (error) {
                console.log('Une erreur s\'est produite lors de la récupération des données:', error);
            }
        }

        fetchData();
    }, []);

    const columns = [
        {field: 'id', headerName: 'ID', width: 60},
        {
            field: 'metier',
            headerName: 'Métier',
            flex: 1,
            valueGetter: (params) => params.row.metier.nom_metier,
        },
        {field: 'username', headerName: 'Name', flex: 1},
        {field: 'email', headerName: 'Email', flex: 1},
        {field: 'year', headerName: 'Année', type: "number"},
    ];

    return (
        <Box m="20px">
            <Header title="USER" subtitle="Liste des Users"/>
            <Box display="flex" justifyContent="flex-end" alignItems="center" margin="30px">
                <Link to="/user/create" style={{ textDecoration: "none" }}>
                    <CustomButton nom="CREATE USER"/>
                </Link>
            </Box>
            <Box m="50 0 0 0" height="70vh" sx={{
                display: "flex",
                flexDirection: "column",
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.tableAccent[500],
                },
                "& .MuiDataGrid-virtualScroller": {},
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.tableAccent[500],
                },
            }}>
                <DataGrid
                    rows={userData}
                    columns={columns}
                />
            </Box>

        </Box>
    );
}

export default User;
