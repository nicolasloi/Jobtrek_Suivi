import Header from "../../components/Header";
import {Box} from "@mui/material";
import {Navigate} from "react-router-dom";
import React from "react";

const Dashboard = ({ user }) => {
    if (!user || !user.username) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle={`Bienvenue sur votre dashboard, ${user.username}`} />
            </Box>
        </Box>
    );
};


export default Dashboard;