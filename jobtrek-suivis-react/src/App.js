import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './pages/global/Topbar';
import Dashboard from './pages/dashboard';
import Sidebar from './pages/global/Sidebar';
import User from './pages/user';
import Login from "./pages/auth/Login";
import Reg from "./pages/auth/Reg";
import CreateUser from "./pages/user/CreateUser";

function App() {
    const [theme, colorMode] = useMode();
    const location = useLocation();

    const shouldShowTopbarAndSidebar = !['/login', '/signup'].includes(location.pathname);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    {shouldShowTopbarAndSidebar && <Sidebar />}
                    <main className="content">
                        {shouldShowTopbarAndSidebar && <Topbar />}
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/user" element={<User />} />
                            <Route path="/user/create" element={<CreateUser />} />
                        </Routes>

                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Reg />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
