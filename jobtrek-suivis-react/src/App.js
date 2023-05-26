<<<<<<< HEAD
<<<<<<< Updated upstream
=======
import { createTheme } from './theme'
import { CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./pages/global/Topbar";
import UserList from "./components/UserList";

>>>>>>> Stashed changes
=======
import React from 'react';
import UserList from './components/UserList';

>>>>>>> frontend
function App() {

    const theme = createTheme();

  return (
<<<<<<< Updated upstream
    <div className="app">
      <h1>mon app</h1>
      <UserList />
    </div>
=======
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <main className="content">
                    <Topbar />
                    <UserList></UserList>
                </main>
            </div>
        </ThemeProvider>
>>>>>>> Stashed changes
  );
}

export default App;
