// src/scenes/global/Sidebar.jsx
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useSettings } from "../../context/SettingsContext";

// Icons
import { FaHome, FaUsers, FaFileInvoiceDollar, FaUserPlus, FaChartBar, FaUserCircle } from "react-icons/fa";
import { FiMenu, FiBriefcase } from "react-icons/fi";
import { AiOutlineFileText, AiOutlineDollarCircle } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";

// Reusable Menu Item
const MenuItemCustom = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      style={{
        margin: "8px 0",
        borderRadius: "12px",
        transition: "all 0.3s ease",
      }}
      rootStyles={{
        "&.ps-active, &:hover": {
          backgroundColor: `${colors.primary[400]} !important`,
          color: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0, 180, 255, 0.3)",
        },
        color: selected === title ? "#fff" : colors.grey[300],
        fontWeight: selected === title ? "600" : "500",
      }}
    >
      <Typography variant="body1">{title}</Typography>
    </MenuItem>
  );
};

// Main Sidebar Component
const SidebarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { settings } = useSettings();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        height: "100vh",
        position: "sticky",
        top: 0,
        "& .ps-sidebar-root": { borderRight: "none" },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={colors.primary[500]}
        rootStyles={{
          borderRight: "none",
          height: "100%",
          boxShadow: "10px 0 30px rgba(0,0,0,0.12)",
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
              },
            },
          }}
        >
          {/* Logo + Toggle */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <FiMenu size={28} /> : undefined}
            style={{ margin: "25px 0 40px 0" }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" px={3}>
                <Typography
                  variant="h3"
                  fontWeight="900"
                  sx={{
                    background: "linear-gradient(90deg, #00d4ff, #0099ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  RORO
                </Typography>
                <IconButton>
                  <FiMenu size={26} color="#fff" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Avatar (only when expanded) */}
          {!isCollapsed && settings?.sidebarCaption === "caption" && (
            <Box textAlign="center" mb="50px" px={2}>
              <Avatar
                alt="RORO Terminal"
                src="https://res.cloudinary.com/clickfactura/image/upload/v1648240084/igt53gtn74hpuyykt0rf.png"
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  border: "5px solid rgba(0, 212, 255, 0.4)",
                  boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)",
                }}
              />
              <Typography variant="h6" color="#fff" mt={2} fontWeight="600">
                RORO Operations
              </Typography>
              <Typography variant="body2" color={colors.grey[400]}>
                Terminal Management System
              </Typography>
            </Box>
          )}

          {/* Menu Items */}
          <Box px={isCollapsed ? 1 : 3}>
            <MenuItemCustom title="Dashboard" to="/" icon={<FaHome size={22} />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="caption"
              fontWeight="bold"
              color={colors.grey[500]}
              sx={{ ml: "16px", mt: "30px", mb: "8px", letterSpacing: "1.5", fontSize: "0.75rem" }}
            >
              OPERATIONS
            </Typography>

            <MenuItemCustom title="Manage Team" to="/team" icon={<FaUsers size={22} />} selected={selected} setSelected={setSelected} />

            <SubMenu
              label="Commercial"
              icon={<FiBriefcase size={22} />}
              rootStyles={{
                "& .ps-menu-button": {
                  borderRadius: "12px !important",
                  margin: "6px 0",
                },
              }}
            >
              <MenuItemCustom title="Contract Registration" to="/ContractRegistrationList" icon={<AiOutlineFileText size={19} />} selected={selected} setSelected={setSelected} />
              <MenuItemCustom title="Manifest" to="/Custmer/Manifest" icon={<AiOutlineFileText size={19} />} selected={selected} setSelected={setSelected} />
              <MenuItemCustom title="Customer Registration" to="/CustmerRegistration" icon={<FaUserPlus size={19} />} selected={selected} setSelected={setSelected} />
              <MenuItemCustom title="Tariff General" to="/TariffGeneral" icon={<AiOutlineDollarCircle size={19} />} selected={selected} setSelected={setSelected} />
            </SubMenu>

            <MenuItemCustom title="Customer" to="/Custmer" icon={<FaUserCircle size={22} />} selected={selected} setSelected={setSelected} />
            <MenuItemCustom title="Invoices" to="/invoices" icon={<FaFileInvoiceDollar size={22} />} selected={selected} setSelected={setSelected} />
            <MenuItemCustom title="Reports" to="/reports" icon={<FaChartBar size={22} />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="caption"
              fontWeight="bold"
              color={colors.grey[500]}
              sx={{ ml: "16px", mt: "30px", mb: "8px", letterSpacing: 1.5, fontSize: "0.75rem" }}
            >
              SYSTEM
            </Typography>

            <MenuItemCustom title="Admin Panel" to="/roro/MD" icon={<MdAdminPanelSettings size={24} />} selected={selected} setSelected={setSelected} />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;