import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import "../../Styles/roro/pageStyles/style.css";

// === React Icons ===
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

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected === title}
      style={{
        color: colors.grey[100],
        backgroundColor:
          selected === title ? colors.primary[400] : "transparent",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SidebarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box className="sidebar-container">
      <Sidebar collapsed={isCollapsed} rootStyles={{ border: "none" }}>
        <Menu>
          {/* Collapse Toggle */}
          <MenuItem
            icon={isCollapsed ? <FiMenu /> : undefined}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              cursor: "pointer",
              background: "transparent",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  RORO-INFYZ
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <FiMenu color={colors.grey[100]} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User Logo */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="https://res.cloudinary.com/clickfactura/image/upload/v1648240084/igt53gtn74hpuyykt0rf.png"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
            </Box>
          )}

          {/* Sidebar Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<FaHome />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Commercial
            </Typography>

            <Item
              title="Manage Team"
              to="/team"
              icon={<FaUsers />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu label="Comercial" icon={<FiBriefcase />}>
              <Item
                title="Contract Registration List"
                to="/ContractRegistrationList"
                icon={<AiOutlineFileText />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Customer Registration"
                to="/CustmerRegistration"
                icon={<FaUserPlus />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Tariff General"
                to="/TariffGeneral"
                icon={<AiOutlineDollarCircle />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <Item
              title="Customer"
              to="/Custmer"
              icon={<FaUserCircle />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Login Page"
              to="/Loginpage"
              icon={<FaUserCircle />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invoices"
              to="/invoices"
              icon={<FaFileInvoiceDollar />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Reports"
              to="/reports"
              icon={<FaChartBar />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Admin"
              to="/roro/MD"
              icon={<MdAdminPanelSettings />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;
