import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/button";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const CreateMetier = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const params = useParams();
    const navigate = useNavigate();
    const handleFormSubmit = async (values, { setErrors }) => {
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
                console.error("Une erreur s'est produite lors de la création du métier.");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la création du métier:", error);
            setErrors({ backend: error.message });
        }
    };

    const checkoutSchema = yup.object().shape({
        NomMetier: yup
            .string()
            .required("Le nom du métier est obligatoire.")
            .matches(/^[a-zA-Z0-9\s-]+$/, "Le nom du métier ne doit contenir que des lettres, des chiffres, des espaces et des tirets.")
            .max(30, "Le nom du métier ne peut pas dépasser 30 caractères."),
    });

    const initialValues = {
        NomMetier: "",
        domaines: [],
    };

    return (
        <Box m="20px">
            <Header title="CREATE METIER" subtitle="Créer un nouveau métier" />
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
                      push,
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
                                label="Nom du métier"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.NomMetier}
                                name="NomMetier"
                                error={!!touched.NomMetier && !!errors.NomMetier}
                                helperText={touched.NomMetier && errors.NomMetier}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>

                        <FieldArray name="domaines">
                            {({ push: pushDomaine, remove: removeDomaine }) => (
                                <>
                                    {values.domaines.map((domaine, index) => (
                                        <div key={index}>
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Nom du domaine"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={domaine.nom_domaine}
                                                name={`domaines[${index}].nom_domaine`}
                                                error={!!touched.domaines?.[index]?.nom_domaine && !!errors.domaines?.[index]?.nom_domaine}
                                                helperText={touched.domaines?.[index]?.nom_domaine && errors.domaines?.[index]?.nom_domaine}
                                                sx={{ gridColumn: "span 4", mt: 2 }}
                                            />

                                            <FieldArray name={`domaines[${index}].competences`}>
                                                {({ push: pushCompetence, remove: removeCompetence }) => (
                                                    <>
                                                        {domaine.competences.map((competence, compIndex) => (
                                                            <div key={compIndex}>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="filled"
                                                                    type="text"
                                                                    label="Nom de la compétence"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    value={competence.nom_competence}
                                                                    name={`domaines[${index}].competences[${compIndex}].nom_competence`}
                                                                    error={!!touched.domaines?.[index]?.competences?.[compIndex]?.nom_competence && !!errors.domaines?.[index]?.competences?.[compIndex]?.nom_competence}
                                                                    helperText={touched.domaines?.[index]?.competences?.[compIndex]?.nom_competence && errors.domaines?.[index]?.competences?.[compIndex]?.nom_competence}
                                                                    sx={{ gridColumn: "span 4" }}
                                                                />

                                                                <FieldArray name={`domaines[${index}].competences[${compIndex}].modules`}>
                                                                    {({ push: pushModule, remove: removeModule }) => (
                                                                        <>
                                                                            {competence.modules.map((module, modIndex) => (
                                                                                <div key={modIndex}>
                                                                                    <TextField
                                                                                        fullWidth
                                                                                        variant="filled"
                                                                                        type="text"
                                                                                        label="Nom du module"
                                                                                        onBlur={handleBlur}
                                                                                        onChange={handleChange}
                                                                                        value={module.nom_module}
                                                                                        name={`domaines[${index}].competences[${compIndex}].modules[${modIndex}].nom_module`}
                                                                                        error={!!touched.domaines?.[index]?.competences?.[compIndex]?.modules?.[modIndex]?.nom_module && !!errors.domaines?.[index]?.competences?.[compIndex]?.modules?.[modIndex]?.nom_module}
                                                                                        helperText={touched.domaines?.[index]?.competences?.[compIndex]?.modules?.[modIndex]?.nom_module && errors.domaines?.[index]?.competences?.[compIndex]?.modules?.[modIndex]?.nom_module}
                                                                                        sx={{ gridColumn: "span 4" }}
                                                                                    />

                                                                                    <Button
                                                                                        type="button"
                                                                                        color="secondary"
                                                                                        variant="contained"
                                                                                        onClick={() => removeModule(modIndex)}
                                                                                        sx={{ mt: 2 }}
                                                                                    >
                                                                                        Supprimer le module
                                                                                    </Button>
                                                                                </div>
                                                                            ))}

                                                                            <Button
                                                                                type="button"
                                                                                color="primary"
                                                                                variant="contained"
                                                                                onClick={() =>
                                                                                    pushModule({
                                                                                        nom_module: "",
                                                                                    })
                                                                                }
                                                                                sx={{ mt: 2 }}
                                                                            >
                                                                                Ajouter un module
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                </FieldArray>

                                                                <Button
                                                                    type="button"
                                                                    color="secondary"
                                                                    variant="contained"
                                                                onClick={() => removeCompetence(compIndex)}
                                                                    sx={{ mt: 2 }}
                                                                >
                                                                    Supprimer la compétence
                                                                </Button>
                                                            </div>
                                                        ))}

                                                        <Button
                                                            type="button"
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() =>
                                                                pushCompetence({
                                                                    nom_competence: "",
                                                                    modules: [],
                                                                })
                                                            }
                                                            sx={{ mt: 2 }}
                                                        >
                                                            Ajouter une compétence
                                                        </Button>
                                                    </>
                                                )}
                                            </FieldArray>

                                            <Button
                                                type="button"
                                                color="secondary"
                                                variant="contained"
                                                onClick={() => removeDomaine(index)}
                                                sx={{ mt: 2 }}
                                            >
                                                Supprimer le domaine
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        color="primary"
                                        variant="contained"
                                        onClick={() =>
                                            pushDomaine({
                                                nom_domaine: "",
                                                competences: [],
                                            })
                                        }
                                        sx={{ mt: 2 }}
                                    >
                                        Ajouter un domaine
                                    </Button>
                                </>
                            )}
                        </FieldArray>

                        <Box display="flex" justifyContent="space-between" mt="20px">
                            <Link to="/metier" style={{ textDecoration: "none" }}>
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
                                    mt: 2,
                                }}
                            >
                                Créer un nouveau métier
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default CreateMetier;
