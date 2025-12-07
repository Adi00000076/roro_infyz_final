// src/pages/RoRoLogin.jsx
import React, { useState, useEffect } from "react";
import LoginPage, {
  Email,
  Password,
  Submit,
  Title,
  TitleLogin,
  Logo,
  InnerBox,
} from "@react-login-page/page10";

// Background images
import LoginImg from "@react-login-page/page10/bg.png";
import LoginInnerBgImg from "@react-login-page/page10/inner-bg.jpg";

// MUI Anchor Icon (Premium maritime look)
import AnchorIcon from "@mui/icons-material/Anchor";

import { successToast, errorToast } from "../../exta_lookups/Toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoRoLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth) {
      try {
        const parsed = JSON.parse(auth);
        if (parsed?.token) {
          navigate("/", { replace: true });
        }
      } catch (e) {
        console.error("Invalid auth data");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return errorToast("Please enter email and password");
    }

    try {
      const success = await login(form.email, form.password);

      if (success) {
        successToast("Welcome back, Captain!");
        navigate("/");
      } else {
        errorToast("Invalid email or password");
      }
    } catch (err) {
      errorToast("Login failed. Please try again.");
    }
  };

  return (
    <LoginPage
      style={{
        height: "100vh",
        backgroundImage: `url(${LoginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: '"Satoshi", "Inter", system-ui, sans-serif',
      }}
    >
      {/* Inner glass background */}
      <InnerBox style={{ backgroundImage: `url(${LoginInnerBgImg})` }} />

      {/* Hide default title */}
      <Title visible={false} />

      {/* Optional: Custom Title (uncomment if you want text back) */}
      {/* <TitleLogin>
        <h1 style={{ fontSize: "3.5rem", fontWeight: 900, color: "#F7C948", margin: 0 }}>
          RoRo Portal
        </h1>
      </TitleLogin> */}

      {/* Premium Floating Anchor Icon */}
      <Logo>
        <div
          style={{
            width: 110,
            height: 110,
            background: "linear-gradient(135deg, #F7C948 0%, #E69A00 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(247,201,72,0.6)",
            border: "8px solid rgba(255,255,255,0.3)",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <AnchorIcon
            sx={{
              fontSize: 72,
              color: "#000",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
          />
        </div>
      </Logo>

      {/* Email Field */}
      <Email
        label="Email Address"
        placeholder="admin@gmail.com"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      {/* Password Field */}
      <Password
        label="Password"
        placeholder="Enter your password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      {/* Premium Golden Submit Button */}
      <Submit onClick={handleSubmit}>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "16px 0",
            fontSize: "1.25rem",
            fontWeight: 800,
            background: "linear-gradient(135deg, #F7C948 0%, #E69A00 100%)",
            color: "#000",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
            boxShadow: "0 12px 40px rgba(247,201,72,0.5)",
            transition: "all 0.3s ease",
            marginTop: "10px",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-5px)";
            e.target.style.boxShadow = "0 20px 50px rgba(247,201,72,0.7)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 12px 40px rgba(247,201,72,0.5)";
          }}
        >
          Sign In Securely
        </button>
      </Submit>

      {/* Floating animation for the anchor */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </LoginPage>
  );
};

export default RoRoLogin;