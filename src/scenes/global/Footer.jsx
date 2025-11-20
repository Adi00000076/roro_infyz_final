import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        p: 2,
        textAlign: "center",
        mt: "auto",
      }}
    >
      <Typography variant="body2" color={colors.grey[100]}>
        © 2025 roro.com All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
