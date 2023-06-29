import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import CustomButton from "../../components/button";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProjetEval = ({ user }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const params = useParams();
    const navigate = useNavigate();
    const [competences, setCompetences] = useState([]);
    const [userProjets, setUserProjets] = useState([]);

    useEffect(() => {
        const fetchCompetences = async () => {
            try {
                const response = await fetch('http://localhost:5080/api/Competence');
                if (response.ok) {
                    const data = await response.json();
                    setCompetences(data);
                } else {
                    console.error("Une erreur s'est produite lors de la récupération des compétences.");
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des compétences:", error);
            }
        };

        const fetchUserProjets = async () => {
            try {
                const response = await fetch('http://localhost:5080/api/Projet');
                if (response.ok) {
                    const data = await response.json();
                    setUserProjets(data);
                } else {
                    console.error("Une erreur s'est produite lors de la récupération des projets utilisateur.");
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des projets utilisateur:", error);
            }
        };

        fetchCompetences();
        fetchUserProjets();
    }, []);

    if (!user || !user.username) {
        return <Navigate to="/login" replace />;
    }

    const handleFormSubmit = async (values, { setErrors }) => {
        try {
            const response = await fetch('http://localhost:5080/api/Evaluation', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                navigate("/projet");
            } else {
                console.error("Une erreur s'est produite lors de la création de l'évaluation.");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la création de l'évaluation:", error);
            setErrors({ backend: error.message });
        }
    };

    const checkoutSchema = yup.object().shape({
        commentaire_eval: yup.string().required("Le commentaire est obligatoire."),
        note_eval: yup
            .number()
            .required("La note est obligatoire.")
            .min(1, "La note doit être supérieure ou égale à 1.")
            .max(6, "La note doit être inférieure ou égale à 6."),
        competenceId: yup.number().required("L'ID de la compétence est obligatoire."),
        userId: yup.number().required("L'ID de l'utilisateur est obligatoire."),
        userProjetId: yup.number().required("L'ID du projet utilisateur est obligatoire."),
    });

    const userId = parseInt(user.id);
    console.log(userId)

    const initialValues = {
        commentaire_eval: "",
        note_eval: null,
        competenceId: null,
        userId: userId,
        userProjetId: null,
    };

    return (
        <Box m="20px">
            <Header title="CREATE EVALUATION" subtitle="Créer une nouvelle évaluation de projet" />

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
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Commentaire"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.commentaire_eval}
                                name="commentaire_eval"
                                error={!!touched.commentaire_eval && !!errors.commentaire_eval}
                                helperText={touched.commentaire_eval && errors.commentaire_eval}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Note"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.note_eval}
                                name="note_eval"
                                error={!!touched.note_eval && !!errors.note_eval}
                                helperText={touched.note_eval && errors.note_eval}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <Select
                                fullWidth
                                variant="filled"
                                label="Compétence ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.competenceId}
                                name="competenceId"
                                error={!!touched.competenceId && !!errors.competenceId}
                                helperText={touched.competenceId && errors.competenceId}
                                sx={{ gridColumn: "span 4" }}
                            >
                                {competences.map((competence) => (
                                    <MenuItem key={competence.idCompetence} value={competence.idCompetence}>
                                        {competence.nom_competence}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Select
                                fullWidth
                                variant="filled"
                                label="User Projet ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userProjetId}
                                name="userProjetId"
                                error={!!touched.userProjetId && !!errors.userProjetId}
                                helperText={touched.userProjetId && errors.userProjetId}
                                sx={{ gridColumn: "span 4" }}
                            >
                                {userProjets.map((userProjet) => (
                                    <MenuItem key={userProjet.id} value={userProjet.id}>
                                        {userProjet.nom_projet}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt="20px">
                            <Link to="/projet" style={{ textDecoration: "none" }}>
                                <CustomButton nom="Retour" />
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
                                Create New Projet Evaluation
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default ProjetEval;
