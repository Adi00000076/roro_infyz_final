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
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
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

const Topbar = () => {
  const theme = useTheme();
  const { logout } = useAuth();
  const { settings, updateSetting } = useSettings();

  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [windowsAnchorEl, setWindowsAnchorEl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openProfile = Boolean(anchorEl);
  const openSettings = Boolean(settingsAnchorEl);
  const openWindows = Boolean(windowsAnchorEl);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}

    
      sx={{
        background: "linear-gradient(10deg, transparent, #00d4ff, transparent)",
          opacity: 0.6,
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #23282f",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        position: "sticky",
        top: 0,
        zIndex: 1300,
        height: "70px",
      }}
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor="#1f2529"
        borderRadius="8px"
        border="1px solid #333"
        sx={{ minWidth: 300 }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: "white", fontSize: "14px" }}
          placeholder="Search"
        />
        <IconButton type="button" sx={{ p: 1, color: "#888" }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" gap={0.5}>
        <IconButton
          onClick={(e) => setWindowsAnchorEl(e.currentTarget)}
          sx={{ color: "white", "&:hover": { bgcolor: "#2a2f38" } }}
        >
          <BsWindows size={20} />
        </IconButton>
        <IconButton sx={{ color: "white", "&:hover": { bgcolor: "#2a2f38" } }}>
          <FaLanguage size={22} />
        </IconButton>
        <IconButton
          onClick={toggleFullscreen}
          sx={{ color: "white", "&:hover": { bgcolor: "#2a2f38" } }}
        >
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <IconButton
          onClick={() =>
            updateSetting(
              "themeMode",
              settings.themeMode === "dark" ? "light" : "dark"
            )
          }
          sx={{ color: "white", "&:hover": { bgcolor: "#2a2f38" } }}
        >
          {settings.themeMode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton sx={{ color: "white", "&:hover": { bgcolor: "#2a2f38" } }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={(e) => setSettingsAnchorEl(e.currentTarget)}
          sx={{ color: "white", "&:hover": { bgcolor: "#2a2f38" } }}
        >
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ color: "white", "&:hover": { bgcolor: "#2a2f38" } }}
        >
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* PROFILE MENU */}
      <Menu
        anchorEl={anchorEl}
        open={openProfile}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            bgcolor: "#1a1f25",
            color: "white",
            mt: 1,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            border: "1px solid #333",
          },
        }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
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
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            bgcolor: "#1a1f25",
            color: "#ddd",
            width: 620,
            maxWidth: "95vw",
            borderRadius: "12px",
            boxShadow: "0 12px 50px rgba(0,0,0,0.7)",
            border: "1px solid #333",
            p: 2,
          },
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
      >
        <Box p={3} minWidth={360} bgcolor="#1a1f25" color="white">
          <Typography variant="h6" mb={2}>
            Settings
          </Typography>
          <Divider sx={{ bgcolor: "#333", mb: 2 }} />

          {/* Theme Mode */}
          <Box mb={2}>
            <Typography variant="subtitle2" mb={1}>
              Theme Mode
            </Typography>
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
          </Box>
          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Theme Contrast */}
          <Box mb={2}>
            <Typography variant="subtitle2" mb={1}>
              Theme Contrast
            </Typography>
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
          </Box>
          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Primary Color */}
          <Box mb={2}>
            <Typography variant="subtitle2" mb={1}>
              Custom Theme
            </Typography>
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
          </Box>
          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Sidebar Caption */}
          <Box mb={2}>
            <Typography variant="subtitle2" mb={1}>
              Sidebar Caption
            </Typography>
            <FormControl>
              <RadioGroup
                row
                value={settings.sidebarCaption}
                onChange={(e) =>
                  updateSetting("sidebarCaption", e.target.value)
                }
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
          </Box>
          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Layout */}
          <Box mb={2}>
            <Typography variant="subtitle2" mb={1}>
              Theme Layout
            </Typography>
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
          </Box>
          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Direction */}
          <Box mb={2}>
            <Typography variant="subtitle2" mb={1}>
              Menu Direction
            </Typography>
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
          </Box>
          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Layout Width */}
          <Box mb={2}>
            <Typography variant="subtitle2" mb={1}>
              Layout Width
            </Typography>
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
          </Box>
          <Divider sx={{ bgcolor: "#333", my: 2 }} />

          {/* Font Family */}
          <Box mb={2}>
            <Typography variant="subtitle2" mb={1}>
              Font Family
            </Typography>
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
        </Box>
      </Popover>
    </Box>
  );
};

export default Topbar;
