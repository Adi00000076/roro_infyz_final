// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Button,
//   Drawer,
//   TextField,
//   IconButton,
//   CircularProgress,
//   InputAdornment,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "@/roro_api/roroAxiosInstance";

// /* ---------------- Ionicons ---------------- */
// import {
//   IoArrowBack,
//   IoAddCircle,
//   IoClose,
//   IoCreate,
//   IoSearch,
// } from "react-icons/io5";

// export default function CompanyDetails() {
//   const navigate = useNavigate();

//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [total, setTotal] = useState(0);

//   const [form, setForm] = useState({
//     companyName: "",
//     shortName: "",
//     streetName: "",
//     emailId: "",
//     telNo: "",
//     mobileNo: "",
//     fax: "",
//     panNumber: "",
//     serviceTax: "",
//     webId: "",
//     fActive: "Y",
//   });

//   /* ---------------- Fetch Data ---------------- */
//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const res = await axiosInstance.get(
//         `/companydetails?page=${page}&size=${pageSize}`
//       );

//       const list = res.data._embedded?.icCompanyDetailsDTOList || [];

//       setRows(list.map((d) => ({ id: d.companyId, ...d })));
//       setTotal(res.data.page?.totalElements || 0);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- Submit Form ---------------- */
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       await axiosInstance.post("/companydetails", form);
//       setDrawerOpen(false);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- Edit Row ---------------- */
//   const handleEdit = (row) => {
//     setEditId(row.id);
//     setForm({ ...row });
//     setDrawerOpen(true);
//   };

//   /* ---------------- Search ---------------- */
//   const filteredRows = rows.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchText.toLowerCase())
//   );

//   /* ---------------- Grid Columns ---------------- */
//   const columns = [
//     { field: "companyId", headerName: "ID", width: 80 },
//     { field: "companyName", headerName: "Company Name", width: 200 },
//     { field: "shortName", headerName: "Short Name", width: 150 },
//     { field: "streetName", headerName: "Street", width: 150 },
//     { field: "emailId", headerName: "Email", width: 200 },
//     { field: "mobileNo", headerName: "Mobile", width: 150 },
//     { field: "panNumber", headerName: "PAN", width: 150 },

//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 120,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleEdit(params.row)}>
//           <IoCreate size={22} color="#1976d2" />
//         </IconButton>
//       ),
//     },
//   ];

//   useEffect(() => {
//     fetchData();
//   }, [page, pageSize]);

//   return (
//     <Box>
//       {/* ---------------- Header ---------------- */}

//       {/* ---------------- Search + Add Button ---------------- */}
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//         mb={2}
//       >
//         <Box display="flex" alignItems="center" mb={2}>
//           <IconButton onClick={() => navigate(-1)}>
//             <IoArrowBack size={22} />
//           </IconButton>
//           <Typography variant="h5" ml={1}>
//             Company Details
//           </Typography>
//         </Box>
//         <Box display="flex" alignItems="center" gap={2}>
//           <TextField
//             placeholder="Search..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <IoSearch size={20} />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: 300 }}
//           />

//           <Typography variant="body1" sx={{ fontWeight: 600 }}>
//             Total: {total}
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={<IoAddCircle size={22} />}
//           onClick={() => {
//             setEditId(null);
//             setForm({
//               companyName: "",
//               shortName: "",
//               streetName: "",
//               emailId: "",
//               telNo: "",
//               mobileNo: "",
//               fax: "",
//               panNumber: "",
//               serviceTax: "",
//               webId: "",
//               fActive: "Y",
//             });
//             setDrawerOpen(true);
//           }}
//         >
//           Add
//         </Button>
//       </Box>

//       {/* ---------------- Data Grid ---------------- */}
//       <Box height={500}>
//         <DataGrid
//           rows={filteredRows}
//           columns={columns}
//           pagination
//           paginationMode="server"
//           rowCount={total}
//           page={page}
//           pageSize={pageSize}
//           onPageChange={(newPage) => setPage(newPage)}
//           onPageSizeChange={(newSize) => setPageSize(newSize)}
//           loading={loading}
//         />
//       </Box>

//       {/* ---------------- Right Drawer ---------------- */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <Box width={600} p={2}>
//           <Box display="flex" justifyContent="space-between" mb={2}>
//             <Typography variant="h6">
//               {editId ? "Edit Company" : "Add Company"}
//             </Typography>
//             <IconButton onClick={() => setDrawerOpen(false)}>
//               <IoClose size={22} />
//             </IconButton>
//           </Box>

//           {/* ------------- 6-Column Form Grid ------------- */}
//           <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
//             {Object.keys(form).map(
//               (key) =>
//                 key !== "id" && (
//                   <TextField
//                     key={key}
//                     label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
//                     fullWidth
//                     value={form[key] || ""}
//                     onChange={(e) =>
//                       setForm({ ...form, [key]: e.target.value })
//                     }
//                     sx={{ gridColumn: "span 3" }} // 2 fields per row
//                   />
//                 )
//             )}
//           </Box>

//           <Box mt={3}>
//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={22} /> : "Submit"}
//             </Button>
//           </Box>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// }











import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Drawer,
  TextField,
  IconButton,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/roro_api/roroAxiosInstance";

/* ---------------- Icons ---------------- */
import {
  IoArrowBack,
  IoAddCircle,
  IoClose,
  IoCreate,
  IoSearch,
} from "react-icons/io5";

export default function CompanyDetails() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  /* ----------- EMPTY FORM TEMPLATE ----------- */
  const emptyForm = {
    companyName: "",
    shortName: "",
    streetName: "",
    emailId: "",
    telNo: "",
    mobileNo: "",
    fax: "",
    panNumber: "",
    serviceTax: "",
    webId: "",
    fActive: "Y",
  };

  const [form, setForm] = useState(emptyForm);

  /* ---------------- Fetch Data ---------------- */
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/companydetails?page=${page}&size=${pageSize}`
      );

      const list = res.data._embedded?.icCompanyDetailsDTOList || [];

      setRows(list.map((d) => ({ id: d.companyId, ...d })));
      setTotal(res.data.page?.totalElements || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Submit (Add) ---------------- */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/companydetails", form);
      setDrawerOpen(false);
      setForm(emptyForm);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UPDATE (Edit) ---------------- */
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axiosInstance.put(`/companydetails/${editId}`, form);
      setDrawerOpen(false);
      setEditId(null);
      setForm(emptyForm);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Edit Row ---------------- */
  const handleEdit = (row) => {
    setEditId(row.id);
    setForm({ ...row });
    setDrawerOpen(true);
  };

  /* ---------------- Search Filter ---------------- */
  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  /* ---------------- Grid Columns ---------------- */
  const columns = [
    { field: "companyId", headerName: "ID", width: 80 },
    { field: "companyName", headerName: "Company Name", width: 200 },
    { field: "shortName", headerName: "Short Name", width: 150 },
    { field: "streetName", headerName: "Street", width: 150 },
    { field: "emailId", headerName: "Email", width: 200 },
    { field: "mobileNo", headerName: "Mobile", width: 150 },
    { field: "panNumber", headerName: "PAN", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)}>
          <IoCreate size={22} color="#1976d2" />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  return (
    <Box>
      {/* ---------------- Header ---------------- */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        {/* Back + Title */}
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <IoArrowBack size={22} />
          </IconButton>
          <Typography variant="h5" ml={1}>
            Company Details
          </Typography>
        </Box>

        {/* Search + Total Count */}
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearch size={20} />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />

          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Total: {total}
          </Typography>
        </Box>

        {/* Add Button */}
        <Button
          variant="contained"
          startIcon={<IoAddCircle size={22} />}
          onClick={() => {
            setEditId(null);
            setForm(emptyForm);
            setDrawerOpen(true);
          }}
        >
          Add
        </Button>
      </Box>

      {/* ---------------- Data Grid ---------------- */}
      <Box height={500}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pagination
          paginationMode="server"
          rowCount={total}
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          loading={loading}
        />
      </Box>

      {/* ---------------- Drawer ---------------- */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box width={600} p={2}>
          {/* Title + Close */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">
              {editId ? "Edit Company" : "Add Company"}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <IoClose size={22} />
            </IconButton>
          </Box>

          {/* ---------------- Form ---------------- */}
          <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
            {Object.keys(form).map(
              (key) =>
                key !== "id" && (
                  <TextField
                    key={key}
                    label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
                    fullWidth
                    value={form[key] || ""}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    sx={{ gridColumn: "span 3" }} // 2 per row
                  />
                )
            )}
          </Box>

          {/* ---------------- Submit / Update Button ---------------- */}
          <Box mt={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={editId ? handleUpdate : handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} />
              ) : editId ? (
                "Update"
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
