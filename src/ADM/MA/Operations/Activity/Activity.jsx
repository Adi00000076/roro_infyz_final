import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Drawer,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import { successToast, errorToast } from "@exta/Toastify.js";
import { useNavigate } from "react-router-dom";

/* ---------------- Ionicons (instead of MUI icons) ---------------- */
import {
  IoArrowBack,
  IoSearch,
  IoCloseCircle,
  IoAddCircle,
  IoCreate,
  IoClose,
  IoCheckmarkCircle,
  IoCloseSharp,
} from "react-icons/io5";

import { DataGrid } from "@mui/x-data-grid";
import axiosInstance from "@/roro_api/roroAxiosInstance";

const Activity = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [activities, setActivities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [newActivity, setNewActivity] = useState({
    actTypeCode: "",
    description: "",
    itomsDescription: "",
    fActive: "Y",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  /* ---------------- Fetch Activities ---------------- */
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/activities");

      const list = res.data?._embedded?.icActivityDTOList || [];

      const mapped = list.map((item) => ({
        ...item,
        id: item.actTypeId,
      }));

      setActivities(mapped);
    } catch (err) {
      console.error("❌ Failed to load activities", err);
      errorToast("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  /* ---------------- Submit (Add/Update) ---------------- */
  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      if (mode === "ADD") {
        await axiosInstance.post("/activities", newActivity);
      } else {
        await axiosInstance.put(`/activities/${selectedId}`, newActivity);
      }

      setDrawerOpen(false);
      fetchActivities();

      successToast(
        mode === "ADD"
          ? "Activity added successfully"
          : "Activity updated successfully"
      );
    } catch (err) {
      console.error("❌ Failed", err);
      errorToast("Failed to save activity");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- Edit Drawer Open ---------------- */
  const handleEditOpen = (row) => {
    setMode("EDIT");
    setSelectedId(row.id);

    setNewActivity({
      actTypeCode: row.actTypeCode,
      description: row.description,
      itomsDescription: row.itomsDescription,
      fActive: row.fActive,
    });

    setDrawerOpen(true);
  };

  /* ---------------- DataGrid Columns ---------------- */
  const columns = [
    // { field: "actTypeCode", headerName: "Code", flex: 1 },
    { field: "description", headerName: "Description", flex: 1.5 },
    { field: "itomsDescription", headerName: "ITOMS Description", flex: 1.5 },
    { field: "fActive", headerName: "Active", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEditOpen(params.row)}>
          <IoCreate size={22} color="#1976d2" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      {/* ---------------- Header ---------------- */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        {/* Back Button */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            mr: 1,
            bgcolor: "#f5f5f5",
            "&:hover": { bgcolor: "#e0e0e0" },
          }}
        >
          <IoArrowBack size={22} />
        </IconButton>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { color: "#1976d2" },
            flexShrink: 0,
          }}
        >
          Activities
        </Typography>

        {/* Search */}
        <Box sx={{ flex: 1, mx: 3 }}>
          <TextField
            fullWidth
            placeholder="Search activities..."
            onChange={(e) => {
              const v = e.target.value.toLowerCase();
              if (!v) return fetchActivities();

              setActivities((prev) =>
                prev.filter(
                  (a) =>
                    a.actTypeCode.toLowerCase().includes(v) ||
                    a.description.toLowerCase().includes(v) ||
                    a.itomsDescription.toLowerCase().includes(v)
                )
              );
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearch size={20} color="#757575" />
                </InputAdornment>
              ),

              endAdornment: (
                <IconButton onClick={() => fetchActivities()}>
                  <IoCloseCircle size={20} />
                </IconButton>
              ),
            }}
            sx={{ background: "#fff", borderRadius: 2 }}
          />
        </Box>

        {/* Add Activity Button */}
        <Button
          variant="contained"
          startIcon={<IoAddCircle size={22} />}
          onClick={() => {
            setMode("ADD");
            setNewActivity({
              actTypeCode: "",
              description: "",
              itomsDescription: "",
              fActive: "Y",
            });
            setDrawerOpen(true);
          }}
        >
          Add Activity
        </Button>
      </Box>

      {/* ---------------- DataGrid ---------------- */}
      <DataGrid
        rows={activities}
        columns={columns}
        autoHeight
        getRowId={(r) => r.id}
        loading={loading}
        sx={{
          background: "white",
          borderRadius: 2,
          p: 1,
        }}
      />

      {/* ---------------- Drawer ---------------- */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 400, p: 3 }}>
          {/* Drawer Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {mode === "ADD" ? "Add Activity" : "Edit Activity"}
            </Typography>

            <IconButton onClick={() => setDrawerOpen(false)}>
              <IoClose size={24} />
            </IconButton>
          </Box>

          {/* Form */}
          <TextField
            fullWidth
            label="Activity Code"
            value={newActivity.actTypeCode}
            onChange={(e) =>
              setNewActivity({ ...newActivity, actTypeCode: e.target.value })
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            value={newActivity.description}
            onChange={(e) =>
              setNewActivity({ ...newActivity, description: e.target.value })
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="ITOMS Description"
            value={newActivity.itomsDescription}
            onChange={(e) =>
              setNewActivity({
                ...newActivity,
                itomsDescription: e.target.value,
              })
            }
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Active</InputLabel>
            <Select
              value={newActivity.fActive}
              label="Active"
              onChange={(e) =>
                setNewActivity({ ...newActivity, fActive: e.target.value })
              }
            >
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </Select>
          </FormControl>

          {/* Buttons */}
          <Box mt={3} display="flex" gap={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<IoCheckmarkCircle size={22} />}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <CircularProgress size={24} />
              ) : mode === "ADD" ? (
                "Submit"
              ) : (
                "Update"
              )}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<IoCloseSharp size={22} />}
              onClick={() => setDrawerOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Activity;
