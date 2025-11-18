import React from "react";
import { useClickLogger } from "../hooks/useClickLogger";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { Download } from "@mui/icons-material";

const LogsDisplay = () => {
  const { logs, clearLogs, downloadLogs } = useClickLogger();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Click Logs
      </Typography>
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={downloadLogs}
        >
          Download Logs
        </Button>
        <Button variant="outlined" onClick={clearLogs}>
          Clear Logs
        </Button>
      </Box>
      <Paper sx={{ maxHeight: 400, overflow: "auto" }}>
        <List>
          {logs.length === 0 ? (
            <ListItem>
              <ListItemText primary="No logs available" />
            </ListItem>
          ) : (
            logs.map((log, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`Element: ${log.element}`}
                  secondary={`Path: ${log.path} | Timestamp: ${new Date(
                    log.timestamp
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default LogsDisplay;
