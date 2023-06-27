import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './pages/global/Topbar';
import Dashboard from './pages/dashboard';
import Sidebar from './pages/global/Sidebar';
import User from './pages/user';
import CreateUser from "./pages/user/CreateUser";
import Login from "./pages/login";
import UserEdit from "./pages/user/UserEdit";
import Metier from "./pages/metier";
import CreateMetier from "./pages/metier/CreateMetier";
import MetierEdit from "./pages/metier/MetierEdit";
import CreateProjet from "./pages/projet/CreateProjet";
import Projet from "./pages/projet";


function App() {
    const [theme, colorMode] = useMode();
    const location = useLocation();
    const shouldShowTopbarAndSidebar = !['/login'].includes(location.pathname);
    const [user, setUser] = useState(null);

    const ProtectedRoute = ({
                                redirectPath = '/login',
                                children,
                            }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return <Navigate to={redirectPath} replace />;
        }

        return children;
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    {shouldShowTopbarAndSidebar && <Sidebar />}
                    <main className="content">
                        {shouldShowTopbarAndSidebar && <Topbar onLogout={handleLogout} />}
                        <Routes>
                            <Route path="/login" element={<Login setUser={setUser} />} />

                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard user={user} />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/user"
                                element={
                                    <ProtectedRoute>
                                        <User user={user} />
                                    </ProtectedRoute>}
                            />

                            <Route
                                path="/user/create"
                                element={
                                    <ProtectedRoute>
                                        <CreateUser user={user} />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/user/:id"
                                element={
                                    <ProtectedRoute>
                                        <UserEdit user={user} />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/metier"
                                element={
                                    <ProtectedRoute>
                                        <Metier user={user}/>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/metier/create"
                                element={
                                    <ProtectedRoute>
                                        <CreateMetier user={user}/>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/metier/:id"
                                element={
                                    <ProtectedRoute>
                                        <MetierEdit user={user}/>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/projet"
                                element={
                                    <ProtectedRoute>
                                        <Projet user={user}/>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/projet/create"
                                element={
                                    <ProtectedRoute>
                                        <CreateProjet user={user}/>
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="*" element={<p> La page que vous recherchez n'existe pas. </p>} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


export default App;
