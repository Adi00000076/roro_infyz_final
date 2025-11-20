import React, { useState, useEffect } from "react";
import { successToast, errorToast } from "../../exta_lookups/Toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import loginImage from "../../../resources/outside/login2.jpg";

// React Icons
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth) {
      try {
        const { token } = JSON.parse(auth);
        if (token) navigate("/");
      } catch {}
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password)
      return errorToast("Please fill all fields");

    try {
      const success = await login(form.email, form.password);
      if (success) {
        successToast("Login successful!");
        navigate("/");
      } else {
        errorToast("Invalid email or password");
      }
    } catch {
      errorToast("Server error. Try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, Roboto",
      }}
    >
      {/* Left Image Section */}
      <Box
        sx={{
          flex: 1.2,
          position: "relative",
          animation: "fadeIn 1.4s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        <img
          src={loginImage}
          alt="Login Visual"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.88)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.25)",
            top: 0,
            left: 0,
          }}
        />
      </Box>

      {/* Right Form Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f7f9fc, #eef2f8)",
          animation: "fadeSlideLeft 1.1s ease-out",
          "@keyframes fadeSlideLeft": {
            "0%": { opacity: 0, transform: "translateX(-40px)" },
            "100%": { opacity: 1, transform: "translateX(0)" },
          },
        }}
      >
        <Card
          sx={{
            width: 420,
            padding: 4,
            borderRadius: 4,
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            position: "relative",
            animation: "cardPop 0.9s ease-out",
            "@keyframes cardPop": {
              "0%": { opacity: 0, transform: "scale(0.92)" },
              "100%": { opacity: 1, transform: "scale(1)" },
            },
          }}
        >
          {/* Floating Lock Icon */}
          <Box
            sx={{
              position: "absolute",
              top:0,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fff",
              width: 70,
              height: 70,
              borderRadius: "50%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <FiLock style={{ fontSize: 32, color: "#2C5364" }} />
          </Box>

          <CardContent>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              sx={{
                mt: 4,
                mb: 1,
                background: "linear-gradient(90deg,#0F2027,#2C5364)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Login to Your Account
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: "gray", mb: 3 }}
            >
              Please enter your email and password
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
              />

              {/* Password + Show/Hide Icon */}
              <Box sx={{ position: "relative", mt: 2 }}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />

                <Box
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </Box>
              </Box>

              {/* Login Button */}
              <Button
                fullWidth
                type="submit"
                sx={{
                  mt: 3,
                  py: 1.4,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: "linear-gradient(90deg,#0F2027,#203A43,#2C5364)",
                  color: "#fff",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  },
                }}
              >
                LOGIN
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
