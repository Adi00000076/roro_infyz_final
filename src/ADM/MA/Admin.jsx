import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, TextField, InputAdornment, Button, Grid } from "@mui/material";

// React Icons
import { IoArrowBack, IoSearch, IoClose, IoBuild, IoHammer, IoBusiness } from "react-icons/io5";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Header */}
      <AppBar position="static">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
        >
          {/* Back + Title */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton color="inherit" onClick={() => navigate(-1)}>
              <IoArrowBack size={22} />
            </IconButton>
            <Typography variant="h6" fontWeight="600">
              Master Admin
            </Typography>
          </Box>

          {/* Search */}
          <Box sx={{ flexGrow: 1, maxWidth: 350 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Global Search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch size={18} style={{ color: "#555" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
          </Box>

          <Button
            variant="contained"
            color="error"
            startIcon={<IoClose size={18} />}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Toolbar>
      </AppBar>

      {/* GRID layout with ICON + TEXT only (no cards) */}
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={4}>
          {/* Service */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" fontWeight={600} mr={5} color="primary">
              <IoBuild size={28} color="#1976d2" /> Service Master
            </Typography>

            <Link
              to="/roro/MD/Service"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h5" mt={2} fontWeight={600} color="primary">
                Commercial
              </Typography>
            </Link>
          </Grid>

          {/* Operations */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" fontWeight={600} color="primary">
              <IoHammer size={28} color="#2e7d32" /> Operations
            </Typography>

            <Link
              to="/roro/MD/Activity"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box display="flex" mt={2} alignItems="center" mr={5} gap={1}>
                <Typography variant="h5" fontWeight={600} color="primary">
                  Activity
                </Typography>
              </Box>
            </Link>
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" fontWeight={600} color="primary">
              <IoBusiness size={28} color="#ef6c00" />
              Sequrity
            </Typography>

            <Link
              to="/roro/MD/CompanyDetailes"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box display="flex" mr={5} alignItems="center" gap={1}>
                <Typography
                  variant="h5"
                  mt={2}
                  fontWeight={600}
                  color="primary"
                >
                  Company
                </Typography>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Admin;