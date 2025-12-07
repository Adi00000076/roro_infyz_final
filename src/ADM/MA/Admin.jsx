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
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { IoArrowBack, IoSearch, IoClose, IoBuild, IoHammer, IoBusiness } from "react-icons/io5";
import { motion } from "framer-motion"; // Optional: for smooth animations

const Admin = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <IoBuild size={32} />,
      title: "Service Master",
      subtitle: "Commercial",
      link: "/roro/MD/Service",
      color: "#2563eb", // blue-600
    },
    {
      icon: <IoHammer size={32} />,
      title: "Operations",
      subtitle: "Activity",
      link: "/roro/MD/Activity",
      color: "#16a34a", // green-600
    },
    {
      icon: <IoBusiness size={32} />,
      title: "Security",
      subtitle: "Company",
      link: "/roro/MD/CompanyDetailes",
      color: "#ea580c", // orange-600
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)" }}>
      {/* Modern Header */}
      <AppBar
        position="static"
        elevation={0}
        mt={25}
        sx={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e0e0e0",
          color: "#1e293b",
        }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={() => navigate(-1)} sx={{ color: "#475569" }}>
              <IoArrowBack size={24} />
            </IconButton>
            <Typography variant="h5" fontWeight={700} color="#0f172a">
              Master Admin
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, maxWidth: 420, mx: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Global Search..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch color="#64748b" />
                  </InputAdornment>
                ),
              }}
              
            />
          </Box>

          <Button
            variant="contained"
            color="error"
            startIcon={<IoClose />}
            onClick={() => navigate(-1)}
          
          >
            Cancel
          </Button>
        </Toolbar>
      </AppBar>

      {/* Floating Cards Grid */}
      <Box sx={{ px: { xs: 3, md: 6 }, py: 6 }}>
        <Grid container spacing={5} justifyContent="center">
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Paper
                  component={Link}
                  to={item.link}
                  elevation={8}
                
                >
                  <Box
                    
                  >
                    {React.cloneElement(item.icon, { size: 40 })}
                  </Box>

                  <Stack spacing={1}>
                    <Typography variant="h5" fontWeight={700} color="#1e293b">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color={item.color}
                      sx={{
                        opacity: 0.9,
                        letterSpacing: 0.5,
                        "&:hover": { opacity: 1 },
                      }}
                    >
                      {item.subtitle} →
                    </Typography>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Admin;