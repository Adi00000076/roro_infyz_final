import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorList: [], // store multiple errors
    };
  }

  static getDerivedStateFromError(error) {
    console.error("Error caught by ErrorBoundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Add new error to list (preserves previous errors)
    this.setState((prevState) => ({
      errorList: [
        ...prevState.errorList,
        { error, errorInfo, time: new Date().toLocaleString() },
      ],
    }));
  }

  handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#fff",
            background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
            ⚠️ Something went wrong
          </h1>
          <p style={{ marginBottom: "30px", color: "#ddd" }}>
            Please try refreshing the page or contact support if the problem
            persists.
          </p>

          {/* Go Back Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={this.handleGoBack}
            sx={{
              textTransform: "none",
              mb: 3,
              borderRadius: 2,
              backgroundColor: "#90caf9",
              color: "#000",
              "&:hover": { backgroundColor: "#64b5f6" },
            }}
          >
            Go Back
          </Button>

          {/* Show detailed error info */}
          {import.meta.env.DEV && this.state.errorList.length > 0 && (
            <div
              style={{
                maxWidth: "600px",
                textAlign: "left",
                background: "rgba(255,255,255,0.05)",
                padding: "20px",
                borderRadius: "10px",
                overflowY: "auto",
                maxHeight: "300px",
              }}
            >
              <h3 style={{ color: "#90caf9" }}>
                Error Details (Development Mode)
              </h3>
              {this.state.errorList.map((err, index) => (
                <details
                  key={index}
                  style={{
                    whiteSpace: "pre-wrap",
                    color: "#f8bbd0",
                    marginTop: "10px",
                  }}
                  open
                >
                  <summary>
                    <strong>Error #{index + 1}</strong> — {err.time}
                  </summary>
                  <p style={{ color: "#ff8a80" }}>
                    {err.error && err.error.toString()}
                  </p>
                  <pre style={{ color: "#ccc" }}>
                    {err.errorInfo?.componentStack}
                  </pre>
                </details>
              ))}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
