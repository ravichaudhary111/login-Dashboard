import React, { useState } from "react";
import { Box, TextField, Button, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginRequest } from "../api";

export default function LoginForm({ onSuccess, onError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const data = await loginRequest(email, password);
      // loginRequest returns { message, status, token }
  onSuccess && onSuccess(data.token);
    } catch (err) {
  // try to extract Joi validation details or API message
  const apiErr = err.response?.data || err;
  const message = apiErr?.message || err.message || "Login failed";
  const details = apiErr?.details || null;
  onError && onError({ message, details });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 3, display: "grid", gap: 2 }}>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={submit} disabled={loading} startIcon={loading ? <CircularProgress size={18} /> : null}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
