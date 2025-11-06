import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

import Loginpage from "./Authentication/Login/Loginpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HelmetProvider } from "react-helmet-async";
import Navigation from "./Navigation";
import ErrorBoundary from "./roro_api/roroErrorBoundary.jsx";
import ScrollToTop from "react-scroll-up";
import { FaChevronUp } from "react-icons/fa";
import { useEffect, useState } from "react";

const AppContent = () => {
  const { settings } = useSettings();
  const [theme, colorMode] = useMode(settings || {});
  const { isAuthenticated } = useAuth();
  const [showInspectScreen, setShowInspectScreen] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setShowInspectScreen(true);
    };

    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        setShowInspectScreen(true);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

 

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
        <div className="app" dir={settings.direction}>
          <Sidebar />

          <main
            className="content"
            style={{
              width: settings.layoutWidth === "fluid" ? "100%" : "1200px",
              margin: settings.layoutWidth === "fluid" ? "0" : "0 auto",
            }}
          >
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
          <SettingsProvider>
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
          </SettingsProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
