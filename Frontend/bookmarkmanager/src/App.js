import { Routes, Route } from "react-router-dom";
import Login from "./scenes/authentication/Login";
import Signup from "./scenes/authentication/Signup";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Wrapper from "./Wrapper";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Wrapper/>} />
        </Routes>
        
        {/* <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
            </Routes>
          </main>
        </div> */}
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
