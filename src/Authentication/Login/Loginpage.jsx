import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import { successToast, errorToast } from "../../exta_lookups/Toastify";

const Loginpage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      errorToast("Please fill in both fields.");
      return;
    }
    const success = login(form.email, form.password);
    if (success) {
      successToast("Login successful!");
      navigate("/");
    } else {
      errorToast("Invalid email or password.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #ffa467 0%, #ff5164 100%)",
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
      }}
    >
      {/* 🌊 Decorative Wave */}
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <path
          fill="#fff"
          d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,186.7C672,192,768,192,864,165.3C960,139,1056,85,1152,90.7C1248,96,1344,160,1392,192L1440,224V320H0Z"
        />
      </Box>

      {/* ✨ Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: "center", color: "#fff", zIndex: 2 }}
      >
        <motion.h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            background: "linear-gradient(90deg, #fff, #ffe7d9, #fff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          INFYZ SOLUTION
        </motion.h1>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Delivering Sustainable Logistics
        </Typography>
      </motion.div>

      {/* 🔐 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          width: "100%",
          maxWidth: 420,
          marginTop: "2rem",
          zIndex: 2,
        }}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box textAlign="center" mb={3}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 0.5, color: "#fff" }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ color: "#f0f0f0" }}>
                Please log in to continue
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                required
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": { borderColor: "#fff" },
                    "&.Mui-focused fieldset": { borderColor: "#fff" },
                  },
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiInputLabel-root": { color: "#eee" },
                }}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": { borderColor: "#fff" },
                    "&.Mui-focused fieldset": { borderColor: "#fff" },
                  },
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiInputLabel-root": { color: "#eee" },
                }}
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
                mb={2}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": { color: "#fff" },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="#fff">
                      Remember Me
                    </Typography>
                  }
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#fff",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                    backgroundColor: "#fff",
                    color: "#ff5164",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  Login
                </Button>
              </motion.div>
            </form>

            <Typography variant="body2" align="center" mt={3} color="#fff">
              Don’t have an account?{" "}
              <Typography
                component="span"
                sx={{
                  color: "#fff",
                  fontWeight: 500,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Sign Up
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Loginpage;
