import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, TextField, InputAdornment, Button, Grid } from "@mui/material";

// React Icons
import { IoArrowBack, IoSearch, IoClose, IoBuild, IoHammer, IoBusiness } from "react-icons/io5";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Box >
      {/* Header */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          {/* Back + Title */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton color="inherit" onClick={() => navigate(-1)}>
              <IoArrowBack size={22} />
            </IconButton>
            <Typography variant="h6" fontWeight="600">Master Admin</Typography>
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
                )
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
            <Link to="/roro/MD/Service" style={{ textDecoration: "none", color: "inherit" }}>
              <Box display="flex" alignItems="center" gap={1}>
                <IoBuild size={28} color="#1976d2" />
                <Typography variant="h5" fontWeight={600} color="primary">Service Master</Typography>
              </Box>
            </Link>
          </Grid>

          {/* Operations */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/roro/MD/Activity" style={{ textDecoration: "none", color: "inherit" }}>
              <Box display="flex" alignItems="center" gap={1}>
                <IoHammer size={28} color="#2e7d32" />
                <Typography variant="h5" fontWeight={600} color="primary">Operations Master</Typography>
              </Box>
            </Link>
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/roro/MD/CompanyDetailes" style={{ textDecoration: "none", color:"inherit" }}>
              <Box display="flex" alignItems="center" gap={1}>
                <IoBusiness size={28} color="#ef6c00" />
                <Typography variant="h5" fontWeight={600} color="primary">Company</Typography>
              </Box>
            </Link>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default Admin;