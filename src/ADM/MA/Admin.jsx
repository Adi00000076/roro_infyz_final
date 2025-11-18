import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Left: Back + Title */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton color="inherit" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h6" fontWeight="600">
              Master Admin
            </Typography>
          </Box>

          {/* Center: Global Search */}
          <Box sx={{ flexGrow: 1, maxWidth: 350 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Global Search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#555" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 1,
              }}
            />
          </Box>

          {/* Right: Cancel button */}
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Toolbar>
      </AppBar>
      {/* Simple anchor-link menu */}
      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Link
          to="/roro/MD/Service"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#1976d2",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          <HomeRepairServiceIcon style={{ marginRight: "8px" }} />
          Service Master
        </Link>
        <Typography variant="h4" color="primary">
          Services
        </Typography>
        <Link
          to="/roro/MD/Activity"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#1976d2",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          <BuildCircleIcon style={{ marginRight: "8px" }} />
          Operations Master
        </Link>

        <Typography variant="h4" color="primary">
  Security
        </Typography>
        <Link
          to="/roro/MD/CompanyDetailes"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#1976d2",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          <BuildCircleIcon style={{ marginRight: "8px" }} />
        Company
        </Link>
      </Box>
    </Box>
  );
};

export default Admin;
