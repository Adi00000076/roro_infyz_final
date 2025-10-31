import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AddBusiness } from "@mui/icons-material";

const Comercial = () => {
  const [deals, setDeals] = useState([
    {
      id: 1,
      company: "Infyz Solutions",
      project: "Fleet Management System",
      value: "$120,000",
      status: "Ongoing",
    },
    {
      id: 2,
      company: "Global Tech Pvt Ltd",
      project: "AI Chat Integration",
      value: "$85,000",
      status: "Completed",
    },
  ]);

  const [form, setForm] = useState({
    company: "",
    project: "",
    value: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddDeal = (e) => {
    e.preventDefault();
    if (!form.company || !form.project || !form.value) {
      alert("Please fill in all required fields.");
      return;
    }

    const newDeal = {
      id: deals.length + 1,
      ...form,
    };

    setDeals([...deals, newDeal]);
    setForm({
      company: "",
      project: "",
      value: "",
      status: "",
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Commercial Management
      </Typography>

      {/* Add New Deal Form */}
      <Card sx={{ mb: 4, maxWidth: 700 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Add New Commercial Deal
          </Typography>

          <form onSubmit={handleAddDeal}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name *"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Name *"
                  name="project"
                  value={form.project}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Project Value *"
                  name="value"
                  value={form.value}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  placeholder="e.g., Ongoing, Completed"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddBusiness />}
                  type="submit"
                >
                  Add Deal
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Deals Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Commercial Deals List
          </Typography>

          {deals.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Project</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell>{deal.id}</TableCell>
                      <TableCell>{deal.company}</TableCell>
                      <TableCell>{deal.project}</TableCell>
                      <TableCell>{deal.value}</TableCell>
                      <TableCell>{deal.status || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography color="textSecondary">
              No commercial deals found.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Comercial;
