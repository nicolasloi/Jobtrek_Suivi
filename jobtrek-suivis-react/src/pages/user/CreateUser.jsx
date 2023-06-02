import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import CustomButton from "../../components/button";

const CreateUser = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        // Effectuez ici votre appel à l'API pour créer un nouvel utilisateur avec les valeurs du formulaire
        console.log(values);
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
                                helperText={touched.email && errors.email}
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
                                type="text"
                                label="Created At"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.createdAt}
                                name="createdAt"
                                error={!!touched.createdAt && !!errors.createdAt}
                                helperText={touched.createdAt && errors.createdAt}
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
                                type="text"
                                label="Metier"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.metier.nom_metier}
                                name="metier.nom_metier"
                                error={!!touched.metier && !!errors.metier}
                                helperText={touched.metier && errors.metier}
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
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Role"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.role.nom_role}
                                name="role.nom_role"
                                error={!!touched.role && !!errors.role}
                                helperText={touched.role && errors.role}
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
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
    username: yup.string().required("Required"),
    createdAt: yup.date().required("Required"),
    year: yup.number().required("Required"),
    metierId: yup.number().required("Required"),
    RoleId: yup.number().required("Required"),
});

const initialValues = {
    email: "",
    password: "",
    username: "",
    createdAt: "",
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
