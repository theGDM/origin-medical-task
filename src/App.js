import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/login/Login.jsx';
import Register from "./pages/register/Register.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Admin from "./pages/admin/Admin.jsx";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="app">
          <main className="content">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
