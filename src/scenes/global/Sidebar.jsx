import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

// === MUI Icons ===
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
          height: "100vh",
          overflowY: "auto",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed} rootStyles={{ border: "none" }}>
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: active ? colors.primary[500] : "transparent",
              color: active ? "#ffffff" : colors.grey[100],
              padding: "8px 35px 8px 20px",
              borderRadius: "4px",
              margin: "2px 8px",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: active
                  ? colors.primary[600]
                  : colors.primary[300],
                color: "#ffffff",
                transform: "translateX(2px)",
              },
            }),
          }}
        >
          {/* Collapse Toggle Button */}
          <MenuItem
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              backgroundColor: "transparent",
              cursor: "pointer",
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
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User Info */}
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
              {/* <Box textAlign="center">
              
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Infyz Solution
                </Typography>
              </Box> */}
            </Box>
          )}

          {/* Sidebar Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* Dashboard */}
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
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
            {/* Manage Team */}
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Comercial SubMenu */}
            <SubMenu label="Comercial" icon={<BusinessCenterOutlinedIcon />}>
              <Item
                title="Contract Registration List"
                to="/ContractRegistrationList"
                icon={<DescriptionOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Customer Registration"
                to="/CustmerRegistration"
                icon={<PersonAddAltOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Tariff General"
                to="/TariffGeneral"
                icon={<MonetizationOnOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            {/* Customer Main Section */}
            <Item
              title="Customer"
              to="/Custmer"
              icon={<AccountCircleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* login page */}
            <Item
              title="Loginpage"
              to="/Loginpage"
              icon={<AccountCircleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Invoices */}
            <Item
              title="Invoices "
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
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
