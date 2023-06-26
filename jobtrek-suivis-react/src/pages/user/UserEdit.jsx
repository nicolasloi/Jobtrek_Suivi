import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    FormHelperText,
    Grid,
    Typography,
    Select,
    MenuItem
} from '@mui/material';
import * as yup from "yup";
import Header from "../../components/Header";
import CustomButton from "../../components/button";
import useMediaQuery from "@mui/material/useMediaQuery";

const UserEdit = () => {
    const { id } = useParams();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [roles, setRoles] = useState([]);
    const [metiers, setMetiers] = useState([]);

    const currentDate = new Date();
    const currentCreatedAt = currentDate.toISOString();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5080/api/User/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    formik.setValues({
                        email: data.email,
                        password: '',
                        confirmPassword: '',
                        username: data.username,
                        year: data.year,
                        metierId: data.metierId,
                        metier: {
                            NomMetier: data.metier ? data.metier.NomMetier : "string",
                        },
                        roleId: data.roleId,
                        role: {
                            nom_role: data.role ? data.role.nom_role : "string",
                        },
                    });
                } else {
                    console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur.");
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur:", error);
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

        const fetchRoles = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL_ROLES);
                if (response.ok) {
                    const data = await response.json();
                    setRoles(data);
                } else {
                    console.error("Une erreur s'est produite lors de la récupération des rôles.");
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des rôles:", error);
            }
        };

        fetchUserData();
        fetchMetiers();
        fetchRoles();
    }, [id]);

    const validationSchema = Yup.object().shape({
        email: yup
            .string()
            .email("Email invalide")
            .required("L'email est obligatoire.")
            .matches(/^[A-Za-z0-9._%+-]+@jobtrek\.ch$/, "L'email doit se terminer par @jobtrek.ch."),
        password: yup
            .string()
            .required("Le mot de passe est obligatoire.")
            .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Les mots de passe doivent correspondre.'),
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

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            createdAt: currentCreatedAt,
            year: 0,
            metierId: null,
            metier: {
                NomMetier: "string",
            },
            roleId: null,
            role: {
                nom_role: "string",
            },
        },
        validationSchema,
        onSubmit: (values) => {
            if (values.password !== values.confirmPassword) {
                console.log('Les mots de passe ne correspondent pas.');
                return;
            }

            const updatedUser = {
                email: values.email,
                password: values.password,
                username: values.username,
                createdAt: currentCreatedAt,
                year: values.year,
                metierId: values.metierId,
                metier: {
                    idMetier: userData.metier ? userData.metier.idMetier : null,
                    NomMetier: values.metier ? values.metier.NomMetier : "string",
                },
                roleId: values.roleId,
                role: {
                    idRole: userData.role ? userData.role.idRole : null,
                    nom_role: values.role ? values.role.nom_role : "string",
                },
            };

            fetch(`http://localhost:5080/api/User/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Utilisateur mis à jour avec succès:', data);
                    navigate('/user');
                })
                .catch(error => {
                    console.log('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur:', error);
                });
        },
    });

    const { handleSubmit, handleChange, values, errors } = formik;

    return (
        <Box m="20px">
            <Header title="MODIFY USER" subtitle="Modifier le profil de l'utilisateur" />
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap="30px">
                    <FormControl>
                        <TextField
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            label="Email"
                            error={!!errors.email}
                        />
                        {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <TextField
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            label="Password"
                            error={!!errors.password}
                        />
                        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <TextField
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            label="Confirm Password"
                            error={!!errors.confirmPassword}
                        />
                        {errors.confirmPassword && <FormHelperText>{errors.confirmPassword}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <TextField
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            label="Username"
                            error={!!errors.username}
                        />
                        {errors.username && <FormHelperText>{errors.username}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <TextField
                            type="number"
                            name="year"
                            value={values.year}
                            onChange={handleChange}
                            label="Year"
                            error={!!errors.year}
                        />
                        {errors.year && <FormHelperText>{errors.year}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <Select
                            fullWidth
                            variant="filled"
                            name="metierId"
                            value={values.metierId}
                            onChange={handleChange}
                            label="Metier ID"
                            error={!!errors.metierId}
                        >
                            {metiers.map((metier) => (
                                <MenuItem key={metier.idMetier} value={metier.idMetier}>
                                    {metier.NomMetier}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.metierId && <FormHelperText>{errors.metierId}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <Select
                            fullWidth
                            variant="filled"
                            name="roleId"
                            value={values.roleId}
                            onChange={handleChange}
                            label="Role ID"
                            error={!!errors.roleId}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.idRole} value={role.idRole}>
                                    {role.nom_role}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.roleId && <FormHelperText>{errors.roleId}</FormHelperText>}
                    </FormControl>
                    <Box display="flex" justifyContent="space-between">
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
                            Enregistrer
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default UserEdit;
