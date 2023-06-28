import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem
} from '@mui/material';
import Header from '../../components/Header';
import CustomButton from '../../components/button';
import useMediaQuery from '@mui/material/useMediaQuery';

const ProjetEdit = () => {
    const { id } = useParams();
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();
    const [projetData, setProjetData] = useState({});
    const [metiers, setMetiers] = useState([]);

    useEffect(() => {
        const fetchProjetData = async () => {
            try {
                const response = await fetch(`http://localhost:5080/api/Projet/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProjetData(data);
                    formik.setValues({
                        nom_projet: data.nom_projet,
                        desc_projet: data.desc_projet,
                        time_estimed: data.time_estimed,
                        metierId: data.metierId,
                        metier: {
                            nom_metier: data.metier ? data.metier.nom_metier : 'string',
                        },
                    });
                } else {
                    console.error("Une erreur s'est produite lors de la récupération des données du projet.");
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des données du projet:", error);
            }
        };

        const fetchMetiers = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL_METIERS);
                if (response.ok) {
                    const data = await response.json();
                    setMetiers(data);
                } else {
                    console.error("Une erreur s'est produite lors de la récupération des métiers.");
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des métiers:", error);
            }
        };

        fetchProjetData();
        fetchMetiers();
    }, [id]);

    const validationSchema = Yup.object().shape({
        nom_projet: Yup.string().required("Le nom du projet est obligatoire."),
        desc_projet: Yup.string().required("La description du projet est obligatoire."),
        time_estimed: Yup.string().required("Le temps estimé est obligatoire."),
        metierId: Yup.number().required("L'ID du métier est obligatoire."),
    });

    const formik = useFormik({
        initialValues: {
            nom_projet: '',
            desc_projet: '',
            time_estimed: '',
            metierId: null,
            metier: {
                nom_metier: 'string',
            },
        },
        validationSchema,
        onSubmit: (values) => {
            const updatedProjet = {
                nom_projet: values.nom_projet,
                desc_projet: values.desc_projet,
                time_estimed: values.time_estimed,
                metierId: values.metierId,
                metier: {
                    id: projetData.metier ? projetData.metier.id : null,
                    nom_metier: values.metier ? values.metier.nom_metier : 'string',
                },
            };

            fetch(`http://localhost:5080/api/Projet/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProjet),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Projet mis à jour avec succès:', data);
                    navigate('/projet');
                })
                .catch((error) => {
                    console.log("Une erreur s'est produite lors de la mise à jour du projet:", error);
                });
        },
    });

    const { handleSubmit, handleChange, values, errors } = formik;

    return (
        <Box m="20px">
            <Header title="MODIFY PROJET" subtitle="Modifier le projet" />
            <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Nom du projet"
                        name="nom_projet"
                        value={values.nom_projet}
                        onChange={handleChange}
                        error={!!errors.nom_projet}
                        helperText={errors.nom_projet}
                        sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description du projet"
                        name="desc_projet"
                        value={values.desc_projet}
                        onChange={handleChange}
                        error={!!errors.desc_projet}
                        helperText={errors.desc_projet}
                        sx={{ gridColumn: 'span 4' }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Temps estimé pour faire le projet"
                        name="time_estimed"
                        value={values.time_estimed}
                        onChange={handleChange}
                        error={!!errors.time_estimed}
                        helperText={errors.time_estimed}
                        sx={{ gridColumn: 'span 4' }}
                    />
                    <Select
                        fullWidth
                        variant="filled"
                        label="Metier ID"
                        name="metierId"
                        value={values.metierId}
                        onChange={handleChange}
                        error={!!errors.metierId}
                        helperText={errors.metierId}
                        sx={{ gridColumn: 'span 4' }}
                    >
                        {metiers.map((metier) => (
                            <MenuItem key={metier.id} value={metier.id}>
                                {metier.nom_metier}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box display="flex" justifyContent="space-between" mt="20px">
                    <Link to="/projet" style={{ textDecoration: 'none' }}>
                        <CustomButton nom="Retour" />
                    </Link>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        sx={{
                            fontWeight: 800,
                            fontSize: '14px',
                            lineHeight: '20px',
                            color: '#FFFFFF',
                        }}
                    >
                        Enregistrer
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default ProjetEdit;
