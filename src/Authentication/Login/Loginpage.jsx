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
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Loginpage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in both fields.");
      return;
    }

    const success = login(form.email, form.password);
    if (success) navigate("/");
    else setError("Invalid email or password.");
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      {/* LEFT SIDE — Sliding Branding Text */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 50%, rgba(144,202,249,0.2), transparent 70%)",
          }}
        />

        <motion.div
          style={{
            color: "white",
            textAlign: "center",
            zIndex: 2,
            fontFamily: "Poppins, sans-serif",
          }}
          animate={{
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.h1
            style={{
              fontSize: "2.8rem",
              fontWeight: "bold",
              marginBottom: "0.6rem",
              color: "#90caf9",
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [30, 0, 0, -30],
            }}
            transition={{
              duration: 10,
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
            }}
          >
            Wallenius Wilhelmsen
          </motion.h1>

          <motion.p
            style={{
              fontSize: "1.1rem",
              color: "#ccc",
              maxWidth: "420px",
              margin: "0 auto",
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [30, 0, 0, -30],
            }}
            transition={{
              duration: 10,
              delay: 3,
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
            }}
          >
            Delivering Sustainable Logistics
          </motion.p>

          <motion.p
            style={{
              fontSize: "1rem",
              color: "#90caf9",
              marginTop: "1rem",
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, -20],
            }}
            transition={{
              duration: 10,
              delay: 6,
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
            }}
          >
            Driving Innovation in Global Trade
          </motion.p>
        </motion.div>
      </Box>

      {/* RIGHT SIDE — LOGIN CARD */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: { md: 10, sm: 5, xs: 2 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            zIndex: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              backdropFilter: "blur(15px)",
              background: "rgba(20, 20, 20, 0.8)",
              color: "#fff",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box textAlign="center" mb={3}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <LockOutlined
                    sx={{ fontSize: 50, color: "#90caf9", mb: 1 }}
                  />
                </motion.div>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Welcome Back 
                </Typography>
                <Typography variant="body2" color="gray">
                  Please log in to continue
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined sx={{ color: "#90caf9" }} />
                      </InputAdornment>
                    ),
                  }}
            
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ color: "#90caf9" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#ccc" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                      "&:hover fieldset": { borderColor: "#64b5f6" },
                      "&.Mui-focused fieldset": { borderColor: "#64b5f6" },
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "8px",
                    },
                    "& .MuiInputBase-input": { color: "#fff" },
                    "& .MuiInputLabel-root": { color: "#ccc" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#64b5f6" },
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
                      <Checkbox size="small" sx={{ color: "#90caf9" }} />
                    }
                    label={
                      <Typography variant="body2" color="#ccc">
                        Remember Me
                      </Typography>
                    }
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#90caf9",
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
                      backgroundColor: "#90caf9",
                      color: "#000",
                      "&:hover": { backgroundColor: "#64b5f6" },
                    }}
                  >
                    Login
                  </Button>
                </motion.div>
              </form>

              <Typography variant="body2" align="center" mt={3} color="gray">
                Don’t have an account?{" "}
                <Typography
                  component="span"
                  sx={{ color: "#90caf9", cursor: "pointer", fontWeight: 500 }}
                >
                  Sign Up
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Loginpage;
