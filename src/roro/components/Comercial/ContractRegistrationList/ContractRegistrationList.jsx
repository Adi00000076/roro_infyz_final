import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress } from "@mui/material";
import { apiClient } from "../../../../__api__/Config.js";

const ContractRegistrationList = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingList = async () => {
      try {
        const response = await apiClient.get("/api/bookingList");

        if (Array.isArray(response.data) && response.data.length > 0) {
          const backendData = response.data;

          // ✅ Dynamically generate columns based on the keys of the first object
          const dynamicColumns = Object.keys(backendData[0]).map((key) => ({
            field: key,
            headerName: key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase()), // Pretty header
            width: 200, // default width, adjust as needed
            sortable: true,
          }));

          setColumns(dynamicColumns);
          setData(backendData);
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

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2}>
        Contract Registration List
      </Typography>

      <Box height="75vh">
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          // ✅ Automatically handle missing ID fields
          getRowId={(row) =>
            row.id ||
            row.lineItemId ||
            row.bookingRefNumber ||
            row.contractNumber ||
            row.cargoId ||
            `${Math.random()}-${Date.now()}`
          }
        />
      </Box>
    </Box>
  );
};

export default ContractRegistrationList;
