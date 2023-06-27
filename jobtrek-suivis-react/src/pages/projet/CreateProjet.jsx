import {Box, Button, MenuItem, Select, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import {Link, useNavigate, useParams} from "react-router-dom";
import CustomButton from "../../components/button";
import React, {useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const CreateProjet = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [metiers, setMetiers] = useState([]);

    useEffect(() => {
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

        fetchMetiers();
    }, []);

    const handleFormSubmit = async (values, {setErrors}) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL_PROJET, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                navigate("/projet");
            } else {
                console.error("Une erreur s'est produite lors de la création du projet.");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la création du projet:", error);
            setErrors({backend: error.message});
        }
    };

    const checkoutSchema = yup.object().shape({
        nom_projet: yup
            .string()
            .required("Le nom du projet est obligatoire.")
            .max(30, "Le nom du projet ne peut pas dépasser 30 caractères."),
        desc_projet: yup
            .string()
            .required("la description du projet est obligatoire.")
            .max(100, "la description du projet ne peut pas dépasser 100 caractères."),
        time_estimed: yup
            .string()
            .required("Le temps estimé est obligatoire.")
            .max(30, "Le temps estimé ne peut pas dépasser 30 caractères."),
        metierId: yup.number().required("L'ID du métier est obligatoire."),
    });

    const initialValues = {
        nom_projet: "",
        desc_projet: "",
        time_estimed: "",
        metierId: null,
        metier: {
            nom_metier: "string",
        },
    };

    return (
        <Box m="20px">
            <Header title="CREATE PROJET" subtitle="Créer un nouveau projet"/>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      setErrors,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nom du projet"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.nom_projet}
                                name="nom_projet"
                                error={!!touched.nom_projet && !!errors.nom_projet}
                                helperText={touched.nom_projet && errors.nom_projet}
                                sx={{gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description du projet"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.desc_projet}
                                name="desc_projet"
                                error={!!touched.desc_projet && !!errors.desc_projet}
                                helperText={touched.desc_projet && errors.desc_projet}
                                sx={{gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Temps estimé pour faire le projet"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.time_estimed}
                                name="time_estimed"
                                error={!!touched.time_estimed && !!errors.time_estimed}
                                helperText={touched.time_estimed && errors.time_estimed}
                                sx={{gridColumn: "span 4"}}
                            />
                            <Select
                                fullWidth
                                variant="filled"
                                label="Metier ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.metierId}
                                name="metierId"
                                error={!!touched.metierId && !!errors.metierId}
                                helperText={touched.metierId && errors.metierId}
                                sx={{ gridColumn: "span 4" }}
                            >
                                {metiers.map((metier) => (
                                    <MenuItem key={metier.id} value={metier.id}>
                                        {metier.nom_metier}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt="20px">
                            <Link to="/projet" style={{textDecoration: "none"}}>
                                <CustomButton nom="Retour"/>
                            </Link>

                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#FFFFFF",
                                }}
                            >
                                Crée nouveau Projet
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
        ;
};

export default CreateProjet;
