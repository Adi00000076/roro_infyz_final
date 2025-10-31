import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";


import Custmer from "./roro/components/Custmer/Custmer";
import Comercial from "./roro/components/Comercial/Comercial";
import ContractRegistrationList from "./roro/components/Comercial/ContractRegistrationList/ContractRegistrationList";
import CustmerRegistration from "./roro/components/Comercial/CustmerRegistration/CustmerRegistration";
import TariffGeneral from "./roro/components/Comercial/TariffGeneral/TariffGeneral";

import Loginpage from "./Authentication/Login/Loginpage";

const AppContent = () => {
  const [theme, colorMode] = useMode();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loginpage />
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/Custmer" element={<Custmer />} />
              <Route path="/Comercial" element={<Comercial />} />
              <Route
                path="/ContractRegistrationList"
                element={<ContractRegistrationList />}
              />
              <Route
                path="/CustmerRegistration"
                element={<CustmerRegistration />}
              />
              <Route path="/TariffGeneral" element={<TariffGeneral />} />
            
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
