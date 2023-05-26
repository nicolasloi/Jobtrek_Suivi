import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./pages/global/Topbar";
import React from "react";

function App() {

    const [theme, colorMode] = useMode();

  return (
      <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <main className="content">
                    <Topbar />
                </main>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
