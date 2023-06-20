import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const currentDate = new Date();
    const currentCreatedAt = currentDate.toISOString();

    useEffect(() => {
        // Récupérer les données de l'utilisateur à modifier
        fetch(`http://localhost:5080/api/User/${id}`)
            .then(response => response.json())
            .then(data => {
                setUserData(data);
                formik.setValues({
                    email: data.email,
                    password: '',
                    confirmPassword: '',
                    username: data.username,
                    year: data.year,
                    metierId: data.metierId,
                    nomMetier: data.metier.nom_metier,
                    roleId: data.roleId,
                    nomRole: data.role.nom_role
                });
            })
            .catch(error => {
                console.log('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur:', error);
            });
    }, [id]);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Adresse e-mail invalide').required('Champ requis'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas'),
        username: Yup.string().required('Champ requis'),
        year: Yup.number().required('Champ requis'),
        metierId: Yup.number().required('Champ requis'),
        nomMetier: Yup.string().required('Champ requis'),
        roleId: Yup.number().required('Champ requis'),
        nomRole: Yup.string().required('Champ requis'),
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
                nom_metier: "string",
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
                    idMetier: userData.metier.idMetier,
                    nom_metier: values.nomMetier,
                },
                roleId: values.roleId,
                role: {
                    idRole: userData.role.idRole,
                    nom_role: values.nomRole,
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
        <div>
            <h1>Modifier l'utilisateur {values.username}</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={values.email} onChange={handleChange} required />
                {errors.email && <div>{errors.email}</div>}

                <label>Password:</label>
                <input type="password" name="password" value={values.password} onChange={handleChange} required />
                {errors.password && <div>{errors.password}</div>}

                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} required />
                {errors.confirmPassword && <div>{errors.confirmPassword}</div>}

                <label>Username:</label>
                <input type="text" name="username" value={values.username} onChange={handleChange} required />
                {errors.username && <div>{errors.username}</div>}

                <label>Year:</label>
                <input type="number" name="year" value={values.year} onChange={handleChange} required />
                {errors.year && <div>{errors.year}</div>}

                <label>Metier ID:</label>
                <input type="number" name="metierId" value={values.metierId} onChange={handleChange} required />
                {errors.metierId && <div>{errors.metierId}</div>}

                <label>Role ID:</label>
                <input type="number" name="roleId" value={values.roleId} onChange={handleChange} required />
                {errors.roleId && <div>{errors.roleId}</div>}

                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
};

export default UserEdit;
