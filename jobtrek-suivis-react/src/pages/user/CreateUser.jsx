import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/button";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const currentDate = new Date();
const currentCreatedAt = currentDate.toISOString();

const CreateUser = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const params = useParams();
    const navigate = useNavigate();

    const handleFormSubmit = async (values, { setErrors }) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL_USER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                // Rediriger vers la page utilisateur après la création réussie de l'utilisateur
                navigate("/user");
            } else {
                // Gérer les erreurs de requête si nécessaire
                console.error("Une erreur s'est produite lors de la création de l'utilisateur.");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la création de l'utilisateur:", error);
            setErrors({ backend: error.message });
        }
    };

    return (
        <Box m="20px">
            <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={
                                    (touched.email && errors.email) ||
                                    (errors.backend && touched.email && errors.backend)
                                }
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={!!touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Year"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.year}
                                name="year"
                                error={!!touched.year && !!errors.year}
                                helperText={touched.year && errors.year}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Metier ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.metierId}
                                name="metierId"
                                error={!!touched.metierId && !!errors.metierId}
                                helperText={touched.metierId && errors.metierId}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Role ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.roleId}
                                name="roleId"
                                error={!!touched.roleId && !!errors.roleId}
                                helperText={touched.roleId && errors.roleId}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt="20px">
                            <Link to="/user" style={{ textDecoration: "none" }}>
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
                                Create New User
                            </Button>
                        </Box>
                        {errors.backend && (
                            <Box mt="20px" color="red">
                                {errors.backend}
                            </Box>
                        )}
                    </form>
                )}
            </Formik>
        </Box>
    );
};


const checkoutSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email")
        .required("L'email est obligatoire.")
        .matches(/^[A-Za-z0-9._%+-]+@jobtrek\.ch$/, "L'email doit se terminer par @jobtrek.ch."),
    password: yup
        .string()
        .required("Le mot de passe est obligatoire.")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    username: yup
        .string()
        .required("Le nom d'utilisateur est obligatoire.")
        .max(30, "Le nom d'utilisateur ne peut pas dépasser 30 caractères."),
    year: yup
        .number()
        .required("L'année est obligatoire.")
        .min(1, "L'année doit être supérieure ou égale à 1.")
        .max(4, "L'année doit être inférieure ou égale à 4."),
    metierId: yup.number().required("L'ID du métier est obligatoire."),
    roleId: yup.number().required("L'ID du rôle est obligatoire."),
});

const initialValues = {
    email: "",
    password: "",
    username: "",
    createdAt: currentCreatedAt,
    year: null,
    metierId: null,
    metier: {
        nom_metier: "string",
    },
    roleId: null,
    role: {
        nom_role: "string",
    },
};

export default CreateUser;
