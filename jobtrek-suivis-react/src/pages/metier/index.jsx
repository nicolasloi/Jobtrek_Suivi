import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import { Box, IconButton, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CustomButton from "../../components/button";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Metier = () => {
    const [metierData, setmetierData] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, metierId: null });
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL_METIERS);
                const data = await response.json();
                setmetierData(data);
            } catch (error) {
                console.log('Une erreur s\'est produite lors de la récupération des données:', error);
            }
        }

        fetchData();
    }, []);

    const handleDelete = (id) => {
        setDeleteConfirmation({ open: true, metierId: id });
    };

    const confirmDelete = async () => {
        const { metierId } = deleteConfirmation;

        try {
            await fetch(`http://localhost:5080/api/Metier/${metierId}`, {
                method: 'DELETE',
            });

            // If the deletion was successful, update the user data in the state
            setmetierData((prevData) => prevData.filter((metier) => metier.id !== metierId));
            console.log(`Deleted user with ID: ${metierId}`);
        } catch (error) {
            console.log('Une erreur s\'est produite lors de la suppression du user:', error);
        }

        setDeleteConfirmation({ open: false, metierId: null });
    };

    const cancelDelete = () => {
        setDeleteConfirmation({ open: false, metierId: null });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'nom_metier', headerName: 'Nom', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            align: 'right',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Link to={`/metier/${params.row.id}`}>
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
            <Header title="METIER" subtitle="Liste des Métiers" />
            <Box display="flex" justifyContent="flex-end" alignItems="center" margin="30px">
                <Link to="/metier/create" style={{ textDecoration: "none" }}>
                    <CustomButton nom="CREATE METIER" />
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
                    rows={metierData}
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
                    Êtes-vous sûr de vouloir supprimer ce metier ?
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

export default Metier;
