import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './pages/global/Topbar';
import Dashboard from './pages/dashboard';
import Sidebar from './pages/global/Sidebar';
import User from './pages/user';
import CreateUser from "./pages/user/CreateUser";
import { setAuthToken } from "./components/setAuthToken";
import Login from "./pages/login";


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
        console.log(token);
        if (!token) {
            return <Navigate to={redirectPath} replace />;
        }

        return children;
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ id: '1', name: 'robin' });
            setAuthToken(token);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        setUser(null);
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    {shouldShowTopbarAndSidebar && <Sidebar />}
                    <main className="content">
                        {shouldShowTopbarAndSidebar && <Topbar />}
                        <Routes>
                            <Route path="/user" element={<User />} />
                            <Route path="/user/create" element={<CreateUser />} />
                            <Route path="/login" element={<Login />} />

                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute user={user}>
                                        <Dashboard user={user}/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="*" element={<p>There's nothing here: 404!</p>} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
