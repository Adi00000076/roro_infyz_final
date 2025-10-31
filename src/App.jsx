import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";

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
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
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
