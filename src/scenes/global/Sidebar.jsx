// src/scenes/global/Sidebar.jsx
import { useState } from "react";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useSettings } from "../../context/SettingsContext";
import styles from "./Sidebar.module.css";

// Icons
import {
  FaHome,
  FaUsers,
  FaFileInvoiceDollar,
  FaUserPlus,
  FaChartBar,
  FaUserCircle,
} from "react-icons/fa";
import { FiMenu, FiBriefcase } from "react-icons/fi";
import { AiOutlineFileText, AiOutlineDollarCircle } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";

// Reusable Menu Item
const MenuItemCustom = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  iconColor = "#fff",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Clone icon and apply color
  const coloredIcon = icon
    ? React.cloneElement(icon, {
        style: { ...icon.props?.style, color: iconColor },
      })
    : null;

  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={coloredIcon}
      style={{
        margin: "8px 0",
        borderRadius: "12px",
        transition: "all 0.3s ease",
      }}
      className={styles.menuItem}
      rootStyles={{
        "&.ps-active, &:hover": {
          background: `linear-gradient(90deg, rgba(249,115,22,0.18), rgba(251,146,60,0.12)) !important`,
          color: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(249,115,22,0.12)",
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
      className={styles.sidebar}
      sx={{
        height: "100vh",
        position: "sticky",
        top: 0,
        "& .ps-sidebar-root": { borderRight: "none" },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={{
          borderRight: "none",
          height: "100%",
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: "12px",
              },
            },
          }}
        >
          {/* Logo + Toggle */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <FiMenu size={24} /> : undefined}
            style={{ margin: "18px 0 28px 0" }}
          >
            {!isCollapsed && (
              <Box
                className={styles.brandWrap}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={3}
              >
                <Typography
                  variant="h3"
                  fontWeight="900"
                  className={styles.brandText}
                >
                  RORO
                </Typography>
                <IconButton className={styles.iconBtn}>
                  <FiMenu size={26} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Avatar (only when expanded) */}
          {!isCollapsed && settings?.sidebarCaption === "caption" && (
            <Box className={styles.avatarWrap}>
              <Avatar
                alt="RORO Terminal"
                src="https://res.cloudinary.com/clickfactura/image/upload/v1648240084/igt53gtn74hpuyykt0rf.png"
                className={styles.avatar}
                sx={{
                  mx: "auto",
                  border: "4px solid var(--roro-btn-glow)",
                  boxShadow: "0 0 18px rgba(255,106,60,0.12)",
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
          <Box px={isCollapsed ? 1 : 2}>
            <MenuItemCustom
              title="Dashboard"
              to="/"
              icon={<FaHome size={18} />}
              selected={selected}
              setSelected={setSelected}
              iconColor="#F97316"
            />

            <Typography
              variant="caption"
              fontWeight="bold"
              color={colors.grey[500]}
              sx={{
                ml: "16px",
                mt: "30px",
                mb: "8px",
                letterSpacing: "1.5",
                fontSize: "0.75rem",
              }}
              className={styles.sectionTitle}
            >
              OPERATIONS
            </Typography>

            <MenuItemCustom
              title="Manage Team"
              to="/team"
              icon={<FaUsers size={18} />}
              selected={selected}
              setSelected={setSelected}
              iconColor="#FB923C"
            />

            <SubMenu
              label="Commercial"
              icon={<FiBriefcase size={18} style={{ color: "#FECACA" }} />}
              rootStyles={{
                "& .ps-menu-button": {
                  borderRadius: "12px !important",
                  margin: "6px 0",
                },
              }}
            >
              <MenuItemCustom
                title="Contract Registration"
                to="/ContractRegistrationList"
                icon={<AiOutlineFileText size={16} />}
                selected={selected}
                setSelected={setSelected}
                iconColor="#FFD7C2"
              />
              <MenuItemCustom
                title="Manifest"
                to="/Custmer/Manifest"
                icon={<AiOutlineFileText size={16} />}
                selected={selected}
                setSelected={setSelected}
                iconColor="#FFD7C2"
              />
              <MenuItemCustom
                title="Customer Registration"
                to="/CustmerRegistration"
                icon={<FaUserPlus size={16} />}
                selected={selected}
                setSelected={setSelected}
                iconColor="#FFB84D"
              />
              <MenuItemCustom
                title="Tariff General"
                to="/TariffGeneral"
                icon={<AiOutlineDollarCircle size={16} />}
                selected={selected}
                setSelected={setSelected}
                iconColor="#FFB84D"
              />
            </SubMenu>

            <MenuItemCustom
              title="Customer"
              to="/Custmer"
              icon={<FaUserCircle size={18} />}
              selected={selected}
              setSelected={setSelected}
              iconColor="#FF6A3C"
            />
            <MenuItemCustom
              title="Invoices"
              to="/invoices"
              icon={<FaFileInvoiceDollar size={18} />}
              selected={selected}
              setSelected={setSelected}
              iconColor="#F97316"
            />
            <MenuItemCustom
              title="Reports"
              to="/reports"
              icon={<FaChartBar size={18} />}
              selected={selected}
              setSelected={setSelected}
              iconColor="#FB923C"
            />

            <Typography
              variant="caption"
              fontWeight="bold"
              color={colors.grey[500]}
              sx={{
                ml: "16px",
                mt: "30px",
                mb: "8px",
                letterSpacing: 1.5,
                fontSize: "0.75rem",
              }}
              className={styles.sectionTitle}
            >
              SYSTEM
            </Typography>

            <MenuItemCustom
              title="Admin Panel"
              to="/roro/MD"
              icon={<MdAdminPanelSettings size={20} />}
              selected={selected}
              setSelected={setSelected}
              iconColor="#FF6A3C"
            />
          </Box>
        </Menu>
      </Sidebar>
      {/* Sidebar settings quick button */}
      <Box className={styles.footerSpacing} sx={{ px: 2 }}>
        <button
          aria-label="Open settings"
          onClick={() => window.dispatchEvent(new Event("open-settings"))}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
            background:
              "linear-gradient(90deg, var(--roro-glass-start), var(--roro-glass-mid))",
            color: "#fff",
            border: "none",
            padding: "10px 12px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
              fill="white"
            />
          </svg>
          <span style={{ fontWeight: 600 }}>Settings</span>
        </button>
      </Box>
    </Box>
  );
};

export default SidebarComponent;
