import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Drawer,
  IconButton,
  Divider,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { apiClient } from "../../../../__api__/Config.js";
import { motion } from "framer-motion";
import {
  Search as SearchIcon,
  AddCircleOutline as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const ContractRegistrationList = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchBookingList = async () => {
      try {
        const response = await apiClient.get("/api/bookingList");
        if (Array.isArray(response.data) && response.data.length > 0) {
          const backendData = response.data;
          const dynamicColumns = Object.keys(backendData[0]).map((key) => ({
            field: key,
            headerName: key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase()),
            width: 180,
            sortable: true,
          }));

          setColumns(dynamicColumns);
          setData(backendData);
          setFilteredData(backendData);
        } else {
          throw new Error("Empty or invalid data from backend");
        }
      } catch (err) {
        setError("Failed to fetch booking list");
        console.error("Error fetching booking list:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingList();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    if (!value) return setFilteredData(data);
    const filtered = data.filter((row) =>
      Object.values(row).some(
        (val) => val && val.toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "#f7f9fc",
      }}
    >
      {/* 🔷 Clean Gradient AppBar */}
      <AppBar
        position="static"
        elevation={2}
        sx={{
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Contract Registration
          </Typography>

          {/* Search + Add */}
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#1565c0" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: "white",
             
                width: 240,
                "& .MuiOutlinedInput-root": {
               
                  "& fieldset": { border: "none" },
                },
              }}
            />
            <Button
              startIcon={<AddIcon />}
              onClick={toggleDrawer(true)}
              sx={{
                bgcolor: "white",
                color: "#1565c0",
                fontWeight: 600,
                textTransform: "none",
            
                px: 2.5,
                "&:hover": { bgcolor: "#e3f2fd" },
              }}
            >
              New
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔹 DataGrid Section */}
      <Box sx={{ flexGrow: 1, p: 2, overflow: "hidden" }}>
        <Box
          sx={{
            height: "100%",
    
            boxShadow: 1,
            bgcolor: "white",
            overflow: "hidden", // ⛔ no outside scroll
          }}
        >
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) =>
              row.id ||
              row.lineItemId ||
              row.bookingRefNumber ||
              row.contractNumber ||
              row.cargoId ||
              `${Math.random()}-${Date.now()}`
            }
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.9rem",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f1f8ff",
              },
              "& .MuiDataGrid-virtualScroller": {
                overflowX: "auto !important",
                overflowY: "auto !important",
              },
            }}
          />
        </Box>
      </Box>

      {/* 🧾 Drawer for New/Edit */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 420 },
            p: 3,
            bgcolor: "#f4f8fb",
          },
        }}
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold" color="#1565c0">
              New Contract
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* Form Fields */}
          {["Contract Number", "Customer Name", "Booking Date", "Status"].map(
            (label, idx) => (
              <TextField
                key={idx}
                label={label}
                fullWidth
                type={label === "Booking Date" ? "date" : "text"}
                InputLabelProps={
                  label === "Booking Date" ? { shrink: true } : {}
                }
                sx={{
                  mb: 2,
                  background: "white",
   
                }}
              />
            )
          )}

          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                bgcolor: "#1565c0",
                color: "white",
                textTransform: "none",
               
                "&:hover": { bgcolor: "#0d47a1" },
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: 1,
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
          </Box>
        </motion.div>
      </Drawer>
    </Box>
  );
};

export default ContractRegistrationList;
