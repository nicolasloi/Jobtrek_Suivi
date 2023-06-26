import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import { Box, IconButton, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CustomButton from "../../components/button";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const User = () => {
    const [userData, setUserData] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, userId: null });
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL_USER);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.log('Une erreur s\'est produite lors de la récupération des données:', error);
            }
        }

        fetchData();
    }, []);

    const handleDelete = (id) => {
        setDeleteConfirmation({ open: true, userId: id });
    };

    const confirmDelete = async () => {
        const { userId } = deleteConfirmation;

        try {
            await fetch(`http://localhost:5080/api/User/${userId}`, {
                method: 'DELETE',
            });

            // If the deletion was successful, update the user data in the state
            setUserData((prevData) => prevData.filter((user) => user.id !== userId));
            console.log(`Deleted user with ID: ${userId}`);
        } catch (error) {
            console.log('Une erreur s\'est produite lors de la suppression du user:', error);
        }

        setDeleteConfirmation({ open: false, userId: null });
    };

    const cancelDelete = () => {
        setDeleteConfirmation({ open: false, userId: null });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'metier',
            headerName: 'Métier',
            flex: 1,
            valueGetter: (params) => params.row.metier.nom_metier,
        },
        { field: 'username', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'year', headerName: 'Année', type: "number" },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            align: 'right',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Link to={`/user/${params.row.id}`}>
                        <IconButton size="small">
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Link>
                    <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="USER" subtitle="Liste des Users" />
            <Box display="flex" justifyContent="flex-end" alignItems="center" margin="30px">
                <Link to="/user/create" style={{ textDecoration: "none" }}>
                    <CustomButton nom="CREATE USER" />
                </Link>
            </Box>
            <Box m="50 0 0 0" height="auto" sx={{
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
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 25,50]}
                />
            </Box>

            <Dialog open={deleteConfirmation.open} onClose={cancelDelete}>
                <DialogTitle>Confirmation de suppression</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete}>Annuler</Button>
                    <Button onClick={confirmDelete} variant="contained" color="error">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default User;
