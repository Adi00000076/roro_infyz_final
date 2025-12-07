import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Container,
  Grid,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axiosInstance from "@/roro_api/roroAxiosInstance";
import { successToast, errorToast } from "@exta/Toastify.js";
import { useNavigate } from "react-router-dom";

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import ContentCopy from "@mui/icons-material/ContentCopy";
import History from "@mui/icons-material/History";
import Save from "@mui/icons-material/Save";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import TableView from "@mui/icons-material/TableView";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Manifest = () => {
  const navigate = useNavigate();

  const initialForm = {
    icLocationId: null,
    icCommodityId: null,
    icPriorityId: null,
    icCommodityClassId: null,
    icMakeId: null,
    icModelId: null,
    icModelTypeId: null,
    icStatusId: null,
    icColourId: null,
    icCommodityTypeId: null,
    icHandlingIndicatorId: null,
    icTransferGearId: null,
    icCustomStatusId: null,
    icBerthId: null,
    icCompanyDetailsId: null,
    commodityDescription: null,
    cargoId: "",
    barcode: "",
    statusTime: null,
    serverStatusTime: null,
    lineItemId: 0,
    marksNumbers: null,
    quantity: null,
    dischargeQuantity: null,
    dliveredQuantity: null,
    length: null,
    height: null,
    width: null,
    weight: null,
    weighBridgeWeight: null,
    cubicdimension: null,
    createdBy: 1,
    modifiedBy: 1,
    transhipment: false,
    bookingRefNoToTranshipment: null,
    activityChange: null,
    itVoyageId: null,
    icLocationByPortOfLoadId: null,
    icLocationByPortOfDischargeId: null,
    icLocationByPortOfFinalDestinationId: null,
    icLocationByPortOfReceiptId: null,
    icPartyByShippingLineId: null,
    icPartyByDeliveredToId: null,
    icPartyByConsigneeId: null,
    icPartyByShipperId: null,
    icPartyByAgentId: null,
    icPartyByNotifyId: null,
    beNumber: null,
    bookingNumber: null,
    serviceCenter: false,
    commercialRelDate: null,
    customsValidity: null,
    customsRefNumber: null,
    remarks: null,
    directDelivery: false,
    importCargoThorughTrucks: false,
    icMachinaryMasterId: null,
    parentBlLdgId: null,
    fParent: false,
    fDestuffingCompleted: false,
    workOrderNo: null,
    modeOfTransportIn: null,
    modeOfTransportOut: null,
    icResourcePlanningActivityId: null,
    activityTime: null,
    customsRemarks: null,
    excessFlag: false,
    unNumber: null,
    hazardousClass: null,
    autoDriven: false,
    icMovementTypeId: null,
    externalRefNumber: null,
    externalVoyageNumber: null,
    storageStartDate: null,
    actualLength: null,
    actualHeight: null,
    actualWidth: null,
    actualWeight: null,
    actualCubicdimension: null,
    chassis: null,
    statusUser: 0,
    fScanned: false,
    screenName: null,
    conveyanceRefNumber: null,
    articleNumber: null,
    nctsName: null,
    nctsStreetAndNumber: null,
    nctsCity: null,
    nctsCountry: null,
    nctsPostalCode: null,
    consName: null,
    consStreetAndNumber: null,
    consCity: null,
    consCountry: null,
    consPostalCode: null,
    icCustomDocumentTypeId: null,
    originCountry: null,
    fTransit: false,
    weighBridgeWeightDateTime: null,
    instructions: null,
    countryOfFinalDestinationId: null,
    standardRate: null,
    deckNo: null,
    deckPosition: null,
    fPov: false,
    icShiftId: null,
    dischargeMsgTriggered: false,
    classificationCode: null,
    dangerousComponent: null,
    flashpointTermerature: null,
    market: null,
    icBasisId: null,
    cargoIdReverse: null,
    barcodeReverse: null,
    fEAN: false,
    terminalBerthCode: null,
    afvCode: null,
    shiftCategoryCode: null,
    endOfMonthFlag: false,
    blLdgDetailId: 4,
    createdDate: null,
    modifiedDate: null,
    fassembled: false,
    fstuffed: false,
    fpartsAvailable: false,
    freadyToSold: false,
    fstorage: false,
    ffumigation: false,
    fcustomClearance: false,
    fstackable: null,
    fhazardous: false,
    fequipmentRequired: null,
    fcommercialRelease: false,
    factive: "Y",
    fsold: false,
    fhold: false,
    cmr_CIM: null,
    fconvan: null,
    fonMafi: false,
  };

  const [form, setForm] = useState(initialForm);
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto detect input types (for dynamic form if needed later)
  const renderInput = (key, value) => {
    const label = key;

    if (typeof value === "boolean") {
      return (
        <FormControlLabel
          key={key}
          control={
            <Checkbox
              checked={form[key] || false}
              onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
            />
          }
          label={label}
        />
      );
    }

    if (typeof value === "number") {
      return (
        <TextField
          key={key}
          label={label}
          type="number"
          value={form[key] ?? ""}
          fullWidth
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      );
    }

    if (
      key.toLowerCase().includes("date") ||
      key.toLowerCase().includes("time")
    ) {
      return (
        <TextField
          key={key}
          label={label}
          type="datetime-local"
          value={form[key] ?? ""}
          fullWidth
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
      );
    }

    return (
      <TextField
        key={key}
        label={label}
        value={form[key] ?? ""}
        fullWidth
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
    );
  };

  const handleSearch = async () => {
    setSearched(true);
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/it-bl-ldg-details", {
        cargoId: form.cargoId,
        barcode: form.cargoId,
        factive: "Y",
      });

      setData([{ id: 1, ...response.data }]);
      successToast("Data Loaded Successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to load manifest data");
      errorToast("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (data.length === 0) return;

    try {
      // adjust ID / endpoint as per backend
      await axiosInstance.put("/it-bl-ldg-details/1", data[0]);
      successToast("Saved successfully");
    } catch (err) {
      console.error(err);
      errorToast("Update failed");
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  // DataGrid columns (dynamic from response)
  const columns = useMemo(
    () =>
      Object.keys(data[0] || {})
        .filter((f) => f !== "id")
        .map((f) => ({
          field: f,
          headerName: f.toUpperCase(),
          width: 200,
          editable: true,
        })),
    [data]
  );

  // Update local data when cell edited
  const handleCellEditCommit = (params) => {
    setData((prev) =>
      prev.map((row) =>
        row.id === params.id ? { ...row, [params.field]: params.value } : row
      )
    );
  };

  // Export to Excel
  const handleExportExcel = () => {
    if (!data.length) return;
    const exportData = data.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Manifest");
    XLSX.writeFile(workbook, "manifest.xlsx");
  };

  // Export to PDF
  const handleExportPDF = () => {
    if (!data.length) return;
    const doc = new jsPDF();

    const colKeys = Object.keys(data[0] || {}).filter((f) => f !== "id");
    const tableColumn = colKeys.map((k) => k.toUpperCase());
    const tableRows = data.map((row) => colKeys.map((key) => row[key] ?? ""));

    doc.setFontSize(12);
    doc.text("Manifest Cargo Details", 14, 15);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [33, 150, 243] },
    });

    doc.save("manifest.pdf");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ p: 3 }}>
        {/* Header */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Manifest Search
        </Typography>

        {/* Top Buttons */}
        <Box
          sx={{
            mt: 1,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setForm(initialForm);
                setData([]);
                setSearched(false);
                setError("");
              }}
            >
              Clear
            </Button>
          </Box>

          {/* Right buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              // onClick={handleMoreOption}
            >
              More Option
            </Button>

            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>

        {/* Search Form – arranged similar to other screens */}
        <Paper
          variant="outlined"
          sx={{ p: 2, mb: 2, borderColor: "divider", bgcolor: "#fafafa" }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            Search Parameters
          </Typography>

          <Grid container spacing={2}>
            {/* Vessel / VCN / Voyage # */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Vessel / VCN / Voyage #"
                placeholder="Enter one character"
                fullWidth
                size="small"
              />
            </Grid>

            {/* BL # */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="BL #"
                placeholder="Enter one character"
                fullWidth
                size="small"
              />
            </Grid>

            {/* Hold */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Hold"
              />
            </Grid>

            {/* Vessel / Ext. Voyage # */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Vessel / Ext. Voyage #"
                placeholder="/"
                fullWidth
                size="small"
              />
            </Grid>

            {/* Terminal Booking # */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Terminal Booking #"
                placeholder="Enter one character"
                fullWidth
                size="small"
              />
            </Grid>

            {/* Transhipment */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Transhipment"
              />
            </Grid>

            {/* From Date */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="From Date"
                type="datetime-local"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* To Date */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="To Date"
                type="datetime-local"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Data Range Button */}
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="contained" fullWidth>
                Data Range
              </Button>
            </Grid>

            {/* Cargo Class */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Cargo Class"
                select
                fullWidth
                size="small"
                SelectProps={{ native: true }}
              >
                <option value="">Select One</option>
                <option value="A">Class A</option>
                <option value="B">Class B</option>
                <option value="C">Class C</option>
              </TextField>
            </Grid>

            {/* Model */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Model"
                placeholder="Enter one character"
                fullWidth
                size="small"
              />
            </Grid>

            {/* Consignee */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Consignee"
                placeholder="Enter three characters"
                fullWidth
                size="small"
              />
            </Grid>

            {/* Make */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Make"
                placeholder="Enter one character"
                fullWidth
                size="small"
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Status"
                select
                fullWidth
                size="small"
                SelectProps={{ native: true }}
              >
                <option value="">Select One</option>
                <option value="Y">Active</option>
                <option value="N">Inactive</option>
              </TextField>
            </Grid>

            {/* Carrier */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Carrier"
                placeholder="Enter three characters"
                fullWidth
                size="small"
              />
            </Grid>

            {/* VIN # */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField label="VIN #" fullWidth size="small" />
            </Grid>

            {/* POL */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="POL"
                placeholder="Enter one character"
                fullWidth
                size="small"
              />
            </Grid>

            {/* Chassis # */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField label="Chassis #" fullWidth size="small" />
            </Grid>

            {/* Cargo Id (linked to API search) */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Cargo ID"
                fullWidth
                size="small"
                value={form.cargoId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, cargoId: e.target.value }))
                }
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Results */}
        {searched && data.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Cargo Details
            </Typography>

            <Box sx={{ height: 500, mt: 2 }}>
              {/* Action buttons above grid */}
              <Box
                sx={{
                  mt: 1,
                  mb: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {/* Edit */}
                <Tooltip title="Edit selected record">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                </Tooltip>

                {/* Delete */}
                <Tooltip title="Delete selected record">
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </Tooltip>

                {/* Copy */}
                <Tooltip title="Copy this record">
                  <Button
                    variant="outlined"
                    color="info"
                    startIcon={<ContentCopy />}
                  >
                    Copy
                  </Button>
                </Tooltip>

                {/* History */}
                <Tooltip title="View history for this record">
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={<History />}
                  >
                    History
                  </Button>
                </Tooltip>

                {/* Export Excel */}
                <Tooltip title="Export to Excel">
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handleExportExcel}
                    startIcon={<TableView />}
                  >
                    Excel
                  </Button>
                </Tooltip>

                {/* Export PDF */}
                <Tooltip title="Export to PDF">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleExportPDF}
                    startIcon={<PictureAsPdf />}
                  >
                    PDF
                  </Button>
                </Tooltip>

                {/* Save / Update */}
                <Tooltip title="Save or update current information">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUpdate}
                    startIcon={<Save />}
                  >
                    Save / Update
                  </Button>
                </Tooltip>
              </Box>

              <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 25]}
                disableSelectionOnClick
                onCellEditCommit={handleCellEditCommit}
              />
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Manifest;
