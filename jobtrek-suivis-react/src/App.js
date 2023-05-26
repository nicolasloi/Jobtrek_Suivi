import { createTheme } from './theme'
import { CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./pages/global/Topbar";

function App() {

    const theme = createTheme();

  return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <main className="content">
                    <Topbar />
                </main>
            </div>
        </ThemeProvider>
  );
}

export default App;
