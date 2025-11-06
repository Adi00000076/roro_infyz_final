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
import { apiClient } from "../../../../roro_api/roroApiConfig.js";
import { Description as DescriptionIcon } from "@mui/icons-material";
import {
  Search as SearchIcon,
  AddCircleOutline as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const ContractRegistrationList = () => {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  /* --------------------------------------------------------------
     1. FETCH DATA + BUILD DYNAMIC COLUMNS
     -------------------------------------------------------------- */
  useEffect(() => {
    const fetchBookingList = async () => {
      try {
        const { data } = await apiClient.get("/api/bookingList");

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Empty or invalid data from backend");
        }

        const firstRow = data[0];
        const dynCols = Object.keys(firstRow).map((key) => ({
          key: key, // React key
          field: key,
          headerName: key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase()),
          flex: 1,
          minWidth: 150,
          sortable: true,
        }));

        setColumns(dynCols);
        setRawData(data);
        setFilteredData(data);
      } catch (err) {
        setError("Failed to fetch booking list");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingList();
  }, []);

  /* --------------------------------------------------------------
     2. SEARCH FILTER (client-side)
     -------------------------------------------------------------- */
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    if (!value) {
      setFilteredData(rawData);
      return;
    }

    const filtered = rawData.filter((row) =>
      Object.values(row).some(
        (v) => v != null && v.toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  /* --------------------------------------------------------------
     5. MAIN RENDER
     -------------------------------------------------------------- */
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f7f9fc",
      }}
    >
      {/* ---------- APPBAR (Full Primary Color) ---------- */}
      <AppBar
        position="static"
        elevation={3}
        sx={{ bgcolor: theme.palette.primary.main }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 3 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              flexGrow: 1,
              textAlign: "start",
            }}
          >
            Contract Registration
          </Typography>

          <Box display="flex" alignItems="center" gap={3}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#fff" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 260,
                bgcolor: "rgba(255,255,255,0.15)",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                  "&:hover fieldset": { borderColor: "#fff" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.7)",
                  opacity: 1,
                },
              }}
            />
            <Button
              startIcon={<AddIcon />}
              onClick={toggleDrawer(true)}
              sx={{
                bgcolor: "#fff",
                color: theme.palette.primary.main,
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

      {/* ---------- DATAGRID (Black Header, No Page Scroll) ---------- */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box
          sx={{
            height: "100%",
            bgcolor: "#fff",
            borderRadius: 1,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          <DataGrid
            rows={filteredData}
            columns={columns}
            getRowId={(row) => {
              const id =
                row.id ||
                row.lineItemId ||
                row.bookingRefNumber ||
                row.contractNumber ||
                row.cargoId ||
                `${row.contractNumber || "row"}-${Date.now()}-${Math.random()}`;
              return String(id);
            }}
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: "none",
              // BLACK COLUMN HEADER
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#000", // Black background

                fontWeight: "bold",
                fontSize: "0.95rem",
                borderBottom: "2px solid #444",
              },
              "& .MuiDataGrid-cell": {
                color: "#1a1a1a",
                fontSize: "0.9rem",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e3f2fd",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#f5f5f5",
                color: "#333",
              },
            }}
          />
        </Box>
      </Box>

      {/* ---------- DRAWER (New Contract Form) ---------- */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 440 },
            p: 3,
            bgcolor: "#f4f8fb",
          },
        }}
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={theme.palette.primary.main}
            >
              New Contract
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

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
                sx={{ mb: 2, bgcolor: "#fff" }}
              />
            )
          )}

          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                bgcolor: theme.palette.primary.main,
                "&:hover": { bgcolor: theme.palette.primary.dark },
                textTransform: "none",
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={toggleDrawer(false)}
              sx={{ textTransform: "none" }}
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
