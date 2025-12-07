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
  // Sunset Horizon palette (authoritative colors)
  const sunset = {
    start: "#F97316",
    mid: "#FB923C",
    end: "#FECACA",
    btnGlow: "#FF6A3C",
    chartLight: "#FFD7C2",
    chartAccent: "#FFB84D",
  };

  return (
    <Box >
      {/* HEADER */}
      
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
              <LocalShippingIcon sx={{ color: sunset.mid, fontSize: "26px" }} />
            ),
          },
          {
            title: "3,214",
            subtitle: "Containers on Berth",
            progress: "0.50",
            increase: "+9%",
            icon: (
              <DirectionsBoatIcon
                sx={{ color: sunset.mid, fontSize: "26px" }}
              />
            ),
          },
          {
            title: "1,028",
            subtitle: "Vehicles Processed",
            progress: "0.65",
            increase: "+7%",
            icon: <CommuteIcon sx={{ color: sunset.mid, fontSize: "26px" }} />,
          },
          {
            title: "5,612",
            subtitle: "Storage Units in Warehouse",
            progress: "0.85",
            increase: "+18%",
            icon: (
              <WarehouseIcon sx={{ color: sunset.mid, fontSize: "26px" }} />
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
                sx={{ color: sunset.mid }}
              >
                24,678 Units
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: sunset.mid }}
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
                <Typography color={sunset.mid} variant="h5" fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Vessel: {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                p="5px 10px"
                borderRadius="4px"
                sx={{
                  background: `linear-gradient(90deg, ${sunset.chartLight}, ${sunset.chartAccent})`,
                  color: "#083344",
                  fontWeight: 600,
                }}
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
