import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
      
        width: "100%",
        backgroundColor: "#f5f7fa",
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
        color: "#333",
      }}
    >
      {/* 🔷 Top AppBar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1976d2",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* 🔙 Back + Title */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton color="inherit" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              Master Admin
            </Typography>
          </Box>

          {/* 🔍 Search Field */}
          <Box sx={{ flexGrow: 1, maxWidth: 350 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              fullWidth
              sx={{
                backgroundColor: "#fff",
                borderRadius: "6px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ddd" },
                  "&:hover fieldset": { borderColor: "#1976d2" },
                  "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#888" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" sx={{ color: "#888" }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

         
        </Toolbar>
      </AppBar>

      {/* ⚙️ Main Content Area */}
      <Box
      
      >
        <Paper
          
        >
          <Button
            component={Link}
            title="Service"
            to="/roro/MD/Service"
            variant="contained"
            sx={{
              mt: 2,
            //   textTransform: "none",
            //   fontWeight: "bold",
            //   borderRadius: "6px",
            }}
          >
           Service 
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Admin;
