import {Box, Button, MenuItem, Select, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import {Link, useNavigate, useParams} from "react-router-dom";
import CustomButton from "../../components/button";
import React, {useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const CreateMetier = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const params = useParams();
    const navigate = useNavigate();
    const handleFormSubmit = async (values, {setErrors}) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL_METIERS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                navigate("/metier");
            } else {
                console.error("Une erreur s'est produite lors de la création du metier.");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la création du metier:", error);
            setErrors({backend: error.message});
        }
    };

    const checkoutSchema = yup.object().shape({
        nom_metier: yup
            .string()
            .required("Le nom du metier est obligatoire.")
            .matches(/^[a-zA-Z0-9\s-]+$/, "Le nom du métier ne doit contenir que des lettres, des chiffres, des espaces et des tirets.")
            .max(30, "Le nom d'utilisateur ne peut pas dépasser 30 caractères."),
    });

    const initialValues = {
        nom_metier: "",
    };

    return (
        <Box m="20px">
            <Header title="CREATE METIER" subtitle="Créer un nouveau metier"/>
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
                                label="Nom du metier"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="nom_metier"
                                error={!!touched.nom_metier && !!errors.nom_metier}
                                helperText={touched.nom_metier && errors.nom_metire}
                                sx={{gridColumn: "span 4"}}
                            />
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt="20px">
                            <Link to="/metier" style={{textDecoration: "none"}}>
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
                                Create New Metier
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
        ;
};

export default CreateMetier;
