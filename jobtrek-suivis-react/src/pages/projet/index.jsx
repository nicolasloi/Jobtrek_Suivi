import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    IconButton,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EvaluateIcon from '@mui/icons-material/Assessment';
import Header from '../../components/Header';
import CustomButton from '../../components/button';
import { tokens } from '../../theme';

const Projet = () => {
    const [projetData, setProjetData] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, projetId: null });
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5080/api/Projet');
                const data = await response.json();
                setProjetData(data);
            } catch (error) {
                console.log("Une erreur s'est produite lors de la récupération des données:", error);
            }
        }

        fetchData();
    }, []);

    const handleDelete = (id) => {
        setDeleteConfirmation({ open: true, projetId: id });
    };

    const confirmDelete = async () => {
        const { projetId } = deleteConfirmation;

        try {
            await fetch(`http://localhost:5080/api/Projet/${projetId}`, {
                method: 'DELETE',
            });

            // Si la suppression a réussi, mettez à jour les données des projets dans l'état
            setProjetData((prevData) => prevData.filter((projet) => projet.id !== projetId));
            console.log(`Projet supprimé avec l'ID: ${projetId}`);
        } catch (error) {
            console.log('Une erreur s\'est produite lors de la suppression du projet:', error);
        }

        setDeleteConfirmation({ open: false, projetId: null });
    };

    const cancelDelete = () => {
        setDeleteConfirmation({ open: false, projetId: null });
    };

    const redirectToEvaluation = (id) => {
        navigate(`/projet/eval/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'nom_projet', headerName: 'Nom Projet', flex: 1 },
        { field: 'desc_projet', headerName: 'Description Projet', flex: 1 },
        { field: 'time_estimed', headerName: 'Temps Estimé', flex: 1 },
        {
            field: 'metier',
            headerName: 'Métier',
            flex: 1,
            valueGetter: (params) => params.row.metier.nom_metier,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            align: 'right',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Link to={`/projet/${params.row.id}`}>
                        <IconButton size="small">
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Link>
                    <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => redirectToEvaluation(params.row.id)}>
                        <EvaluateIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="PROJET" subtitle="Liste des Projets" />
            <Box display="flex" justifyContent="flex-end" alignItems="center" margin="30px">
                <Link to="/projet/create" style={{ textDecoration: 'none' }}>
                    <CustomButton nom="CREATE PROJET" />
                </Link>
            </Box>
            <Box
                m="50 0 0 0"
                height="auto"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.tableAccent[500],
                    },
                    '& .MuiDataGrid-virtualScroller': {},
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.tableAccent[500],
                    },
                }}
            >
                <DataGrid
                    rows={projetData}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                />
            </Box>

            <Dialog open={deleteConfirmation.open} onClose={cancelDelete}>
                <DialogTitle>Confirmation de suppression</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir supprimer ce projet ?
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

export default Projet;
