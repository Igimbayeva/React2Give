import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorContext, useMode } from "./theme";
import Topbar from "./pages/global/topbar";
import Sidebar from "./pages/global/navbar";
import Dashboard from "./pages/dash";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  //make sure to wrap it aorund the app and not itself//Setting up routes here
  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorContext.Provider>
  );
}

export default App;
