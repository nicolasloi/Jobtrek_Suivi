import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { Routes, Route } from "react-router-dom"
import Topbar from "./pages/global/Topbar";
import Dashboard from "./pages/dashboard";
import Sidebar from "./pages/global/Sidebar";
import User from "./pages/user";

function App() {

    const [theme, colorMode] = useMode();

  return (
      <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <Sidebar />
                <main className="content">
                    <Topbar />
                    <Routes>
                        <Route path="/" element={<Dashboard/>} />
                        <Route path="/user" element={<User/>} />
                    </Routes>
                </main>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
