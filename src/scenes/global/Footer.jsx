// src/scenes/global/Footer.jsx
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import styles from "./Footer.module.css";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      className={styles.footer}
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
        className={styles.accentLine}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",

        }}
      />

      <Box
        className={styles.footerInner}
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
          className={styles.brand}
        >
          © 2025 <strong>RORO</strong> Terminal Management System. All rights
          reserved.
        </Typography>

        <Typography
          variant="caption"
          color={colors.grey[400]}
          className={styles.meta}
        >
          {/* Powered by{" "} */}
          <Box
            component="span"
            sx={{ color: "#00d4ff", fontWeight: "600" }}
            className={styles.smallHighlight}
          >
            RORO Operations
          </Box>{" "}
          • v2.5.0
        </Typography>
      </Box>
      {/* Footer quick settings button (opens Topbar settings) */}
      {/* <Box sx={{ position: "absolute", right: 16, bottom: 12 }}>
        <button
          aria-label="Open settings"
          onClick={() => window.dispatchEvent(new Event("open-settings"))}
          style={{
            background: "linear-gradient(90deg, var(--roro-btn-glow), #FF8A4A)",
            border: "none",
            color: "#fff",
            padding: "8px 10px",
            borderRadius: 10,
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(255,106,60,0.12)",
          }}
        >
          ⚙ Settings
        </button> 
      </Box>*/}
    </Box>
  );
};

export default Footer;
