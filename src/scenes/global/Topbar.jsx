import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Popover,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  Divider,
  Grid,
  InputBase,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// theme tokens available in `theme` if needed
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { BsWindows } from "react-icons/bs";
import { FaLanguage } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";
import styles from "./Topbar.module.css";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ContrastIcon from "@mui/icons-material/Contrast";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";

const Topbar = () => {
  const theme = useTheme();
  // theme tokens available via tokens(mode) if needed
  const { logout, user } = useAuth();
  const { settings, updateSetting } = useSettings();

  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [windowsAnchorEl, setWindowsAnchorEl] = useState(null);
  const [tipAnchorEl, setTipAnchorEl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openProfile = Boolean(anchorEl);
  const openSettings = Boolean(settingsAnchorEl);
  const openWindows = Boolean(windowsAnchorEl);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    const openSettingsListener = () => {
      const btn = document.getElementById("topbar-settings-btn");
      if (btn) setSettingsAnchorEl(btn);
    };
    window.addEventListener("open-settings", openSettingsListener);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("open-settings", openSettingsListener);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // inject authoritative Sunset tokens as CSS variables so the module can use them
  const cssVars = {
    "--roro-glass-start": "#F97316",
    "--roro-glass-mid": "#FB923C",
    "--roro-glass-end": "#FECACA",
    "--roro-btn-glow": "#FF6A3C",
    "--roro-text-light": theme.palette.mode === "dark" ? "#EDEDED" : "#0f172a",
    "--roro-border":
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.04)"
        : "rgba(15,23,42,0.06)",
    // icon-specific vars for clearer visibility
    "--roro-icon-windows":
      theme.palette.mode === "dark" ? "#7BE7FF" : "#0284C7",
    "--roro-icon-lang": theme.palette.mode === "dark" ? "#7EFBD3" : "#059669",
    "--roro-icon-fullscreen":
      theme.palette.mode === "dark" ? "#AEB8FF" : "#2563EB",
    "--roro-icon-theme":
      theme.palette.mode === "dark" ? "var(--roro-glass-mid)" : "#FB923C",
    "--roro-icon-notif": theme.palette.mode === "dark" ? "#7EE7B8" : "#10B981",
    "--roro-icon-settings": "var(--roro-btn-glow)",
    "--roro-icon-user": theme.palette.mode === "dark" ? "#C4B5FD" : "#7C3AED",
  };

  // computed JS color for menu (Menu is rendered in a portal, so CSS vars on topbar do not propagate)
  const userIconColor = theme.palette.mode === "dark" ? "#C4B5FD" : "#7C3AED";

  return (
    <Box
      className={styles.topbar}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
      }}
      style={cssVars}
    >
      {/* left: search */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          className={styles.search}
          sx={{ display: "flex", alignItems: "center", px: 1 }}
        >
          <SearchIcon sx={{ color: "var(--roro-text-light)", mr: 1 }} />
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            sx={{
              ml: 1,
              flex: 1,
              color: "var(--roro-text-light)",
              fontSize: "14px",
            }}
          />
        </Box>
      </Box>

      {/* right: actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton
          onClick={(e) => setWindowsAnchorEl(e.currentTarget)}
          className={styles.iconBtn}
          sx={{ color: "var(--roro-icon-windows)" }}
        >
          <BsWindows size={18} style={{ color: "var(--roro-icon-windows)" }} />
        </IconButton>

        <IconButton
          className={styles.iconBtn}
          sx={{ color: "var(--roro-icon-lang)" }}
        >
          <FaLanguage size={18} style={{ color: "var(--roro-icon-lang)" }} />
        </IconButton>

        <IconButton
          onClick={toggleFullscreen}
          className={styles.iconBtn}
          sx={{ color: "var(--roro-icon-fullscreen)" }}
        >
          {isFullscreen ? (
            <FullscreenExitIcon sx={{ color: "var(--roro-icon-fullscreen)" }} />
          ) : (
            <FullscreenIcon sx={{ color: "var(--roro-icon-fullscreen)" }} />
          )}
        </IconButton>

        <IconButton
          onClick={() =>
            updateSetting(
              "themeMode",
              settings.themeMode === "dark" ? "light" : "dark"
            )
          }
          className={styles.iconBtn}
          sx={{ color: "var(--roro-icon-theme)" }}
        >
          {settings.themeMode === "dark" ? (
            <DarkModeOutlinedIcon sx={{ color: "var(--roro-icon-theme)" }} />
          ) : (
            <LightModeOutlinedIcon sx={{ color: "var(--roro-icon-theme)" }} />
          )}
        </IconButton>

        <IconButton
          className={styles.iconBtn}
          sx={{ color: "var(--roro-icon-notif)" }}
        >
          <NotificationsOutlinedIcon sx={{ color: "var(--roro-icon-notif)" }} />
        </IconButton>

        <IconButton
          id="topbar-settings-btn"
          onClick={(e) => setSettingsAnchorEl(e.currentTarget)}
          className={styles.iconBtn}
          sx={{ color: "var(--roro-icon-settings)" }}
        >
          <SettingsOutlinedIcon sx={{ color: "var(--roro-icon-settings)" }} />
        </IconButton>

        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className={styles.iconBtn}
          sx={{
            color: "var(--roro-icon-user)",
            background: "#fff",
            border: "2px solid #7C3AED",
            boxShadow: "0 2px 8px rgba(124, 58, 237, 0.10)",
            p: 0.5,
            mr: 8,
            transition: "background 0.2s, border 0.2s",
            "&:hover": {
              background: "#f3e8ff",
              border: "2px solid #5b21b6",
            },
          }}
        >
          <PersonOutlinedIcon
            sx={{ color: "var(--roro-icon-user)", fontSize: 28 }}
          />
        </IconButton>
      </Box>

      {/* PROFILE MENU */}
      <Menu
        anchorEl={anchorEl}
        open={openProfile}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          className: styles.menuPaper,
          sx: {
            mt: 1,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            border: "1px solid #333",
            minWidth: 220,
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 2.25,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <Avatar sx={{ bgcolor: userIconColor, width: 40, height: 40 }}>
            {user && user.username
              ? user.username.charAt(0).toUpperCase()
              : "U"}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 700 }}>
              {user?.username || "User"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Account
            </Typography>
          </Box>
        </Box>
        <Divider />
        <MenuItem
          component={Link}
          to="/profile"
          onClick={() => setAnchorEl(null)}
        >
          Profile
        </MenuItem>
        <MenuItem
          component={Link}
          to="/account"
          onClick={() => setAnchorEl(null)}
        >
          Account Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logout();
            setAnchorEl(null);
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* WINDOWS MENU */}
      <Menu
        anchorEl={windowsAnchorEl}
        open={openWindows}
        onClose={() => setWindowsAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          className: styles.menuPaper,
          sx: { mt: 1, width: 620, maxWidth: "95vw", p: 2 },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <MenuItem
              component={Link}
              to="/Custmer"
              onClick={() => setWindowsAnchorEl(null)}
            >
              <Typography sx={{ fontWeight: 500 }}>Customer</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/Comercial"
              onClick={() => setWindowsAnchorEl(null)}
            >
              <Typography sx={{ fontWeight: 500 }}>Commercial</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/ContractRegistrationList"
              onClick={() => setWindowsAnchorEl(null)}
            >
              <Typography sx={{ fontWeight: 500 }}>
                Contract Registration List
              </Typography>
            </MenuItem>
          </Grid>
          <Grid item xs={6}>
            <MenuItem
              component={Link}
              to="/CustmerRegistration"
              onClick={() => setWindowsAnchorEl(null)}
            >
              <Typography sx={{ fontWeight: 500 }}>
                Customer Registration
              </Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/TariffGeneral"
              onClick={() => setWindowsAnchorEl(null)}
            >
              <Typography sx={{ fontWeight: 500 }}>Tariff General</Typography>
            </MenuItem>
          </Grid>
        </Grid>
      </Menu>

      {/* FULL SETTINGS POPOVER */}
      <Popover
        open={openSettings}
        anchorEl={settingsAnchorEl}
        onClose={() => setSettingsAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ className: styles.menuPaper }}
      >
        <Box p={3} minWidth={360}>
          <Typography
            variant="h6"
            mb={2}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <SettingsOutlinedIcon fontSize="small" /> Settings
          </Typography>
          <Divider sx={{ bgcolor: "#333", mb: 2 }} />

          {/* Theme Mode */}
          <Box mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LightModeOutlinedIcon fontSize="small" />
            <Typography variant="subtitle2" mb={1}>
              Theme Mode
            </Typography>
          </Box>
          <FormControl>
            <RadioGroup
              row
              value={settings.themeMode}
              onChange={(e) => updateSetting("themeMode", e.target.value)}
            >
              <FormControlLabel
                value="light"
                control={<Radio size="small" />}
                label="Light"
              />
              <FormControlLabel
                value="dark"
                control={<Radio size="small" />}
                label="Dark"
              />
            </RadioGroup>
          </FormControl>

          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Theme Contrast */}
          <Box mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ContrastIcon fontSize="small" />
            <Typography variant="subtitle2" mb={1}>
              Theme Contrast
            </Typography>
          </Box>
          <FormControl>
            <RadioGroup
              row
              value={settings.themeContrast}
              onChange={(e) => updateSetting("themeContrast", e.target.value)}
            >
              <FormControlLabel
                value="contrast"
                control={<Radio size="small" />}
                label="High"
              />
              <FormControlLabel
                value="noContrast"
                control={<Radio size="small" />}
                label="Normal"
              />
              <FormControlLabel
                value="custom"
                control={<Radio size="small" />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>

          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Primary Color */}
          <Box mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ColorLensOutlinedIcon fontSize="small" />
            <Typography variant="subtitle2" mb={1}>
              Custom Theme
            </Typography>
          </Box>
          <FormControl fullWidth>
            <Select
              value={settings.primaryColor}
              onChange={(e) => updateSetting("primaryColor", e.target.value)}
              size="small"
            >
              <MenuItem value="theme1">Blue Ocean</MenuItem>
              <MenuItem value="theme2">Purple Haze</MenuItem>
              <MenuItem value="theme3">Green Forest</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Sidebar Caption */}
          <Box mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ViewSidebarIcon fontSize="small" />
            <Typography variant="subtitle2" mb={1}>
              Sidebar Caption
            </Typography>
          </Box>
          <FormControl>
            <RadioGroup
              row
              value={settings.sidebarCaption}
              onChange={(e) => updateSetting("sidebarCaption", e.target.value)}
            >
              <FormControlLabel
                value="showCaption"
                control={<Radio size="small" />}
                label="Show"
              />
              <FormControlLabel
                value="hideCaption"
                control={<Radio size="small" />}
                label="Hide"
              />
            </RadioGroup>
          </FormControl>

          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Layout */}
          <Box mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FitScreenIcon fontSize="small" />
            <Typography variant="subtitle2" mb={1}>
              Theme Layout
            </Typography>
          </Box>
          <FormControl>
            <RadioGroup
              row
              value={settings.layout}
              onChange={(e) => updateSetting("layout", e.target.value)}
            >
              <FormControlLabel
                value="default"
                control={<Radio size="small" />}
                label="Default"
              />
              <FormControlLabel
                value="horizontal"
                control={<Radio size="small" />}
                label="Horizontal"
              />
              <FormControlLabel
                value="miniDrawer"
                control={<Radio size="small" />}
                label="Mini"
              />
            </RadioGroup>
          </FormControl>

          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Direction */}
          <Box mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FormatTextdirectionLToRIcon fontSize="small" />
            <Typography variant="subtitle2" mb={1}>
              Menu Direction
            </Typography>
          </Box>
          <FormControl>
            <RadioGroup
              row
              value={settings.direction}
              onChange={(e) => updateSetting("direction", e.target.value)}
            >
              <FormControlLabel
                value="ltr"
                control={<Radio size="small" />}
                label="LTR"
              />
              <FormControlLabel
                value="rtl"
                control={<Radio size="small" />}
                label="RTL"
              />
            </RadioGroup>
          </FormControl>

          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Layout Width */}
          <Box mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FitScreenIcon fontSize="small" />
            <Typography variant="subtitle2" mb={1}>
              Layout Width
            </Typography>
          </Box>
          <FormControl>
            <RadioGroup
              row
              value={settings.layoutWidth}
              onChange={(e) => updateSetting("layoutWidth", e.target.value)}
            >
              <FormControlLabel
                value="fluid"
                control={<Radio size="small" />}
                label="Fluid"
              />
              <FormControlLabel
                value="container"
                control={<Radio size="small" />}
                label="Boxed"
              />
            </RadioGroup>
          </FormControl>

          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Font Family */}
          <Box mb={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FontDownloadOutlinedIcon fontSize="small" />
            <Typography variant="subtitle2" mb={1}>
              Font Family
            </Typography>
          </Box>
          <FormControl fullWidth>
            <Select
              value={settings.fontFamily}
              onChange={(e) => updateSetting("fontFamily", e.target.value)}
              size="small"
            >
              <MenuItem value="Inter">Inter</MenuItem>
              <MenuItem value="Outfit">Outfit</MenuItem>
              <MenuItem value="Manrope">Manrope</MenuItem>
              <MenuItem value="Plus Jakarta Sans">Plus Jakarta Sans</MenuItem>
              <MenuItem value="Space Grotesk">Space Grotesk</MenuItem>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Helvetica">Helvetica</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Popover>

      {/* TIP floating button */}
      <IconButton
        onClick={(e) => setTipAnchorEl(e.currentTarget)}
        sx={{
          position: "fixed",
          right: 18,
          top: "50%",
          transform: "translateY(-50%)",
          background: "linear-gradient(90deg, var(--roro-btn-glow), #FF8A4A)",
          color: "#fff",
          boxShadow: "0 8px 24px rgba(255,106,60,0.12)",
          "&:hover": { boxShadow: "0 10px 30px rgba(255,106,60,0.16)" },
        }}
        aria-label="Tip"
      >
        <LightbulbOutlinedIcon />
      </IconButton>

      <Popover
        open={Boolean(tipAnchorEl)}
        anchorEl={tipAnchorEl}
        onClose={() => setTipAnchorEl(null)}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "center", horizontal: "left" }}
        PaperProps={{
          className: styles.menuPaper,
          sx: { p: 2, maxWidth: 300 },
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Tip
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Click the settings button to change theme, layout and fonts. Use
            "Custom Theme" to set primary colors.
          </Typography>
          <Typography variant="caption" color="secondary">
            Future: App-clay generator and contextual tips coming soon.
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default Topbar;
