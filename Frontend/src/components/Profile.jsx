import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

export default function Profile({ user, onLogout }) {
  if (!user) return null;

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6">Welcome, {user.name || user.username}</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">Username: {user.username}</Typography>
        <Typography variant="body2">Email: {user.email}</Typography>
        <Typography variant="body2">Role: {user.role}</Typography>
      </Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" color="primary" onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Paper>
  );
}
