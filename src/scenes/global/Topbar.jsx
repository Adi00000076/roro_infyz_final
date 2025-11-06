import {
  Box,
  IconButton,
  useTheme,
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
} from "@mui/material";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useAuth } from "../../context/AuthContext";
import { BsWindows } from "react-icons/bs";
import { FaLanguage } from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { logout } = useAuth();
  const { settings, updateSetting } = useSettings();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const settingsOpen = Boolean(settingsAnchorEl);
  const [windowsAnchorEl, setWindowsAnchorEl] = useState(null);
  const windowsOpen = Boolean(windowsAnchorEl);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSettingsMenuOpen = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleWindowsMenuOpen = (event) => {
    setWindowsAnchorEl(event.currentTarget);
  };

  const handleWindowsMenuClose = () => {
    setWindowsAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton onClick={handleWindowsMenuOpen}>
          <BsWindows />
        </IconButton>

        <IconButton>
          <FaLanguage />
        </IconButton>

        <IconButton onClick={toggleFullscreen}>
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <IconButton
          onClick={() =>
            updateSetting(
              "themeMode",
              settings.themeMode === "dark" ? "light" : "dark"
            )
          }
        >
          {settings.themeMode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleSettingsMenuOpen}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleProfileMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <Typography variant="body1">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography variant="body1">Logout</Typography>
          </MenuItem>
        </Menu>
        <Popover
          open={settingsOpen}
          anchorEl={settingsAnchorEl}
          onClose={handleSettingsMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box p={2} minWidth={300}>
            <Typography variant="h6" mb={2}>
              Settings
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box mb={2}>
              <Typography variant="subtitle2" mb={1}>
                Settings Theme Mode
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={settings.themeMode}
                  onChange={(e) => updateSetting("themeMode", e.target.value)}
                >
                  <FormControlLabel
                    value="light"
                    control={<Radio />}
                    label="Light"
                  />
                  <FormControlLabel
                    value="dark"
                    control={<Radio />}
                    label="Dark"
                  />
                  {/* <FormControlLabel
                    value="auto"
                    control={<Radio />}
                    label="Auto"
                  /> */}
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box mb={2}>
              <Typography variant="subtitle2" mb={1}>
                Theme Contrast
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={settings.themeContrast}
                  onChange={(e) =>
                    updateSetting("themeContrast", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="contrast"
                    control={<Radio />}
                    label="Contrast"
                  />
                  <FormControlLabel
                    value="noContrast"
                    control={<Radio />}
                    label="No Contrast"
                  />
                  <FormControlLabel
                    value="custom"
                    control={<Radio />}
                    label="Custom"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box mb={2}>
              <Typography variant="subtitle2" mb={1}>
                Custom Theme
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={settings.primaryColor}
                  onChange={(e) =>
                    updateSetting("primaryColor", e.target.value)
                  }
                >
                  <MenuItem value="theme1">Theme 1</MenuItem>
                  <MenuItem value="theme2">Theme 2</MenuItem>
                  <MenuItem value="theme3">Theme 3</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box mb={2}>
              <Typography variant="subtitle2" mb={1}>
                Sidebar Caption
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={settings.sidebarCaption}
                  onChange={(e) =>
                    updateSetting("sidebarCaption", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="caption"
                    control={<Radio />}
                    label="Caption"
                  />
                  <FormControlLabel
                    value="showCaption"
                    control={<Radio />}
                    label="Show Caption"
                  />
                  <FormControlLabel
                    value="noCaption"
                    control={<Radio />}
                    label="No Caption"
                  />
                  <FormControlLabel
                    value="hideCaption"
                    control={<Radio />}
                    label="Hide Caption"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box mb={2}>
              <Typography variant="subtitle2" mb={1}>
                Theme Layout
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={settings.layout}
                  onChange={(e) => updateSetting("layout", e.target.value)}
                >
                  <FormControlLabel
                    value="default"
                    control={<Radio />}
                    label="Default"
                  />
                  <FormControlLabel
                    value="horizontal"
                    control={<Radio />}
                    label="Horizontal"
                  />
                  <FormControlLabel
                    value="miniDrawer"
                    control={<Radio />}
                    label="Mini Drawer"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box mb={2}>
              <Typography variant="subtitle2" mb={1}>
                Menu Direction
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={settings.direction}
                  onChange={(e) => updateSetting("direction", e.target.value)}
                >
                  <FormControlLabel
                    value="ltr"
                    control={<Radio />}
                    label="LTR"
                  />
                  <FormControlLabel
                    value="rtl"
                    control={<Radio />}
                    label="RTL"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box mb={2}>
              <Typography variant="subtitle2" mb={1}>
                Layout Width
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={settings.layoutWidth}
                  onChange={(e) => updateSetting("layoutWidth", e.target.value)}
                >
                  <FormControlLabel
                    value="fluid"
                    control={<Radio />}
                    label="Fluid"
                  />
                  <FormControlLabel
                    value="container"
                    control={<Radio />}
                    label="Container"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box mb={2}>
              <Typography variant="subtitle2" mb={1}>
                Font Family
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={settings.fontFamily}
                  onChange={(e) => updateSetting("fontFamily", e.target.value)}
                >
                  {/* Modern UI Fonts */}
                  <MenuItem value="Inter">Aa Inter</MenuItem>
                  <MenuItem value="Outfit">Aa Outfit</MenuItem>
                  <MenuItem value="Manrope">Aa Manrope</MenuItem>
                  <MenuItem value="Plus Jakarta Sans">
                    Aa Plus Jakarta Sans
                  </MenuItem>
                  <MenuItem value="Space Grotesk">Aa Space Grotesk</MenuItem>

                  {/* Classic Web Fonts */}
                  <MenuItem value="Arial">Aa Arial</MenuItem>
                  <MenuItem value="Helvetica">Aa Helvetica</MenuItem>
                  <MenuItem value="Times New Roman">
                    Aa Times New Roman
                  </MenuItem>
                  <MenuItem value="Georgia">Aa Georgia</MenuItem>

                  {/* Cursive & Decorative Fonts */}
                  <MenuItem value="Dancing Script">Aa Dancing Script</MenuItem>
                  <MenuItem value="Pacifico">Aa Pacifico</MenuItem>
                  <MenuItem value="Great Vibes">Aa Great Vibes</MenuItem>
                  <MenuItem value="Satisfy">Aa Satisfy</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Popover>
        <Box sx={{ position: "fixed", top: "20px" }}>
          <Menu
            anchorEl={windowsAnchorEl}
            open={windowsOpen}
            onClose={handleWindowsMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              mt: 5, // Adds space
              "& .MuiPaper-root": {
                width: 600, // Sets menu width
                border: "50px",
                p: 2,
              },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <MenuItem
                  component={Link}
                  to="/Custmer"
                  onClick={handleWindowsMenuClose}
                >
                  <Typography variant="body1">Customer</Typography>
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/Comercial"
                  onClick={handleWindowsMenuClose}
                >
                  <Typography variant="body1">Commercial</Typography>
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/ContractRegistrationList"
                  onClick={handleWindowsMenuClose}
                >
                  <Typography variant="body1">
                    Contract Registration List
                  </Typography>
                </MenuItem>
              </Grid>

              <Grid item xs={6}>
                <MenuItem
                  component={Link}
                  to="/CustmerRegistration"
                  onClick={handleWindowsMenuClose}
                >
                  <Typography variant="body1">Customer Registration</Typography>
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/TariffGeneral"
                  onClick={handleWindowsMenuClose}
                >
                  <Typography variant="body1">Tariff General</Typography>
                </MenuItem>
              </Grid>
            </Grid>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
