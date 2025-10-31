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
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        p: { xs: 2, sm: 4, md: 8 },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)", // darker overlay
          zIndex: 1,
        },
      }}
    >
      <Card
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 420,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          backdropFilter: "blur(15px)",
          background: "rgba(30, 30, 30, 0.85)", // dark translucent
          color: "#fff",
          mr: { xs: 0, md: 8 },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={3}>
            <LockOutlined
              sx={{
                fontSize: 50,
                color: "#90caf9",
                mb: 1,
              }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="#fff"
            >
              Welcome Back 👋
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
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ color: "#90caf9" }} />
                  </InputAdornment>
                ),
                style: { color: "#fff" },
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
              InputLabelProps={{ style: { color: "#ccc" } }}
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
                style: { color: "#fff" },
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
                control={<Checkbox size="small" sx={{ color: "#90caf9" }} />}
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
    </Box>
  );
};

export default Loginpage;
