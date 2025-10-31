import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
} from "@mui/material";

const Custmer = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      company: "ABC Corp",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9123456780",
      company: "Global Tech",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please fill in required fields (Name & Email).");
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      ...form,
    };

    setCustomers([...customers, newCustomer]);
    setForm({ name: "", email: "", phone: "", company: "" });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Customer Management
      </Typography>

      {/* Add Customer Form */}
      <Card sx={{ mb: 4, maxWidth: 700 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Add New Customer
          </Typography>

          <form onSubmit={handleAddCustomer}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name *"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email *"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Customer
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Customer List
          </Typography>

          {customers.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Company</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((cust) => (
                    <TableRow key={cust.id}>
                      <TableCell>{cust.id}</TableCell>
                      <TableCell>{cust.name}</TableCell>
                      <TableCell>{cust.email}</TableCell>
                      <TableCell>{cust.phone || "—"}</TableCell>
                      <TableCell>{cust.company || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography color="textSecondary">
              No customers added yet.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Custmer;
