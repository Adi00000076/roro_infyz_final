import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import CommuteIcon from "@mui/icons-material/Commute";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="RORO OPERATIONS DASHBOARD"
          subtitle="Overview of Container & Vehicle Handling Performance"
        />

        <Box>
          <Button
            sx={{
              background: "linear-gradient(135deg, #ffa467 0%, #ff5164 100%)",
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "10px",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #ff5164 0%, #ffa467 100%)",
                transform: "scale(1.05)",
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {[
          {
            title: "8,542",
            subtitle: "Cargo Units Handled",
            progress: "0.75",
            increase: "+12%",
            icon: (
              <LocalShippingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            ),
          },
          {
            title: "3,214",
            subtitle: "Containers on Berth",
            progress: "0.50",
            increase: "+9%",
            icon: (
              <DirectionsBoatIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            ),
          },
          {
            title: "1,028",
            subtitle: "Vehicles Processed",
            progress: "0.65",
            increase: "+7%",
            icon: (
              <CommuteIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            ),
          },
          {
            title: "5,612",
            subtitle: "Storage Units in Warehouse",
            progress: "0.85",
            increase: "+18%",
            icon: (
              <WarehouseIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            ),
          },
        ].map((item, i) => (
          <Box
            key={i}
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              borderRadius: "12px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: `0 6px 20px ${colors.greenAccent[700]}55`,
                cursor: "pointer",
              },
            }}
          >
            <StatBox
              title={item.title}
              subtitle={item.subtitle}
              progress={item.progress}
              increase={item.increase}
              icon={item.icon}
            />
          </Box>
        ))}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            borderRadius: "12px",
            transition: "0.3s",
            "&:hover": {
              boxShadow: `0 4px 15px ${colors.greenAccent[700]}33`,
            },
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Cargo Throughput (Monthly)
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                24,678 Units
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* RECENT SHIP ARRIVALS */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{
            borderRadius: "12px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Ship Arrivals
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: colors.primary[500],
                  cursor: "pointer",
                },
              }}
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Vessel: {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost} TEUs
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            borderRadius: "12px",
            transition: "0.3s",
            "&:hover": {
              boxShadow: `0 4px 15px ${colors.greenAccent[700]}33`,
            },
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Vessel Utilization
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              82% Capacity Used
            </Typography>
            <Typography>Tracking operational efficiency of berths</Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            borderRadius: "12px",
            transition: "0.3s",
            "&:hover": {
              boxShadow: `0 4px 15px ${colors.greenAccent[700]}33`,
            },
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Cargo Type Distribution
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          sx={{
            borderRadius: "12px",
            transition: "0.3s",
            "&:hover": {
              boxShadow: `0 4px 15px ${colors.greenAccent[700]}33`,
            },
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Global Shipping Routes
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
