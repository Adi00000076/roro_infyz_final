// src/scenes/global/Footer.jsx
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[800]} 100%)`,
        backdropFilter: "blur(10px)",
        borderTop: `1px solid ${colors.primary[400]}`,
        py: 3,
        px: 4,
        mt: "auto",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glowing line on top */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
          opacity: 0.6,
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        <Typography
          variant="body2"
          color={colors.grey[200]}
          fontWeight="500"
          sx={{ letterSpacing: "0.5px" }}
        >
          © 2025 <strong>RORO</strong> Terminal Management System. All rights reserved.
        </Typography>

        <Typography variant="caption" color={colors.grey[400]}>
          Powered by{" "}
          <Box component="span" sx={{ color: "#00d4ff", fontWeight: "600" }}>
            RORO Operations
          </Box>{" "}
          • v2.5.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;