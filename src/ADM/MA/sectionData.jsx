import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

const sectionData = [
  {
    title: "Commercial",
    links: [
      { label: "Customer Type", to: "/roro/MD/customer-type" },
      { label: "Vendor Registration", to: "/roro/MD/vendor-registration" },
    ],
  },
  {
    title: "Marine",
    links: [
      { label: "Berth", to: "/roro/MD/berth" },
      { label: "Berth Maintenance", to: "/roro/MD/berth-maintenance" },
      { label: "Delay Reason", to: "/roro/MD/delay-reason" },
    ],
  },
  {
    title: "Cargo",
    links: [
      { label: "Cargo", to: "/roro/MD/cargo" },
      { label: "Cargo Class", to: "/roro/MD/cargo-class" },
      { label: "Make", to: "/roro/MD/make" },
      { label: "Model Type", to: "/roro/MD/model-type" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Company", to: "/roro/MD/company" },
      { label: "Group Role", to: "/roro/MD/group-role" },
      { label: "User", to: "/roro/MD/user" },
    ],
  },
];
