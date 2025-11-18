import React, { useState, useEffect } from "react";
import { successToast, errorToast } from "../../exta_lookups/Toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("auth");
    if (storedAuth) {
      try {
        const { token } = JSON.parse(storedAuth);
        if (token) {
          navigate("/");
        }
      } catch (e) {
        console.error("Error parsing auth from sessionStorage:", e);
      }
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      errorToast("Please fill in both fields.");
      return;
    }

    try {
      const success = await login(form.email, form.password);
      if (success) {
        successToast("Login successful!");
        navigate("/");
      } else {
        errorToast("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      errorToast("An error occurred. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f9fafc",
        fontFamily: "system-ui, -apple-system, Roboto, sans-serif",
      }}
    >
      {/* 🌊 Left Section with Bubbles + Motion Text */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #4e8cff, #007bff)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          p: 4,
        }}
      >
        {/* Floating Bubbles */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              animation: `float${i} 10s ease-in-out infinite`,
              opacity: 0.7,
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              "@keyframes float0": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-20px)" },
              },
              "@keyframes float1": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-25px)" },
              },
              "@keyframes float2": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-15px)" },
              },
              "@keyframes float3": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-30px)" },
              },
              "@keyframes float4": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-25px)" },
              },
              "@keyframes float5": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-35px)" },
              },
              "@keyframes float6": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-20px)" },
              },
              "@keyframes float7": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-15px)" },
              },
            }}
          />
        ))}

        {/* ✨ Animated Welcome Text */}
        <div style={{ textAlign: "center", zIndex: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>

          <div>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                maxWidth: 800,
                textAlign: "center",
                opacity: 0.9,
                lineHeight: 1.4,
              }}
            >
              Infyz Terminal Operations Management System (iTOMS)
            </Typography>
          </div>
        </div>
      </Box>

      {/* 🔐 Right Section (Login Form) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 400, boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Login Account
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              color="textSecondary"
              mb={3}
            >
              Please enter your email and password
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
                mb={2}
              ></Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  "&:hover": { backgroundColor: "#0056d6" },
                }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
