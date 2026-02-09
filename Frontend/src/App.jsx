import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import AuthTabs from "./components/AuthTabs";
import "./index.css";

export default function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Login Dashboard
        </Typography>
        <AuthTabs />
      </Paper>
    </Container>
  );
}
