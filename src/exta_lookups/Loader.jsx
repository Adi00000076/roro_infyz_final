import React from "react";
import { Box, Typography } from "@mui/material";
import { ImSpinner9 } from "react-icons/im";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        color: "text.secondary",
      }}
    >
      <ImSpinner9
        size={50}
        color="#1976d2" // MUI primary blue
        style={{
          marginBottom: 12,
          animation: "spin 1s linear infinite",
        }}
      />
      <Typography variant="body2">Loading...</Typography>

      {/* Inline CSS animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default Loader;
