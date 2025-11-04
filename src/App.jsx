import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

import Loginpage from "./Authentication/Login/Loginpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HelmetProvider } from "react-helmet-async";
import Navigation from "./Navigation";
import ErrorBoundary from "./__api__/ErroBoundery.jsx";
import ScrollToTop from "react-scroll-up";
import { FaChevronUp } from "react-icons/fa";

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
            <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
              <Navigation />
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <AppContent />
          <ToastContainer />
          <ScrollToTop
            showUnder={160}
            style={{
              position: "fixed",
              bottom: 50,
              right: 50,
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#1976d2",
                color: "white",
                padding: "10px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
              }}
            >
              <FaChevronUp size={20} />
            </div>
          </ScrollToTop>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
