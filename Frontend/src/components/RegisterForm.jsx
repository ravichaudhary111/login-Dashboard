import React, { useState } from "react";
import { Box, TextField, Button, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerRequest } from "../api";

export default function RegisterForm({ onSuccess, onError }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await registerRequest({ username, name, email, mobile, password });
      onSuccess && onSuccess();
    } catch (err) {
  const apiErr = err.response?.data || err;
  const message = apiErr?.message || err.message || "Registration failed";
  const details = apiErr?.details || null;
  onError && onError({ message, details });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 3, display: "grid", gap: 2 }}>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} fullWidth />
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

      <TextField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        error={!!confirmPassword && password !== confirmPassword}
        helperText={!!confirmPassword && password !== confirmPassword ? "Passwords do not match" : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                onClick={() => setShowConfirmPassword((s) => !s)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={submit}
          disabled={
            loading || !username || !name || !email || !mobile || !password || !confirmPassword || password !== confirmPassword
          }
          startIcon={loading ? <CircularProgress size={18} /> : null}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
}
