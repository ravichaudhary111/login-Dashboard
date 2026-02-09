import React, { useState } from "react";
import { Tabs, Tab, Box, Alert } from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Profile from "./Profile";
import { getUser, logoutRequest } from "../api";

export default function AuthTabs() {
  const [tab, setTab] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e, nv) => {
    setTab(nv);
    setError("");
    setSuccess("");
  };

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLoginSuccess = async (accessToken) => {
    try {
      setToken(accessToken);
      // decode token payload to get id (simple, without validation)
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const id = payload.id || payload._id;
      const res = await getUser(id, accessToken);
      setUser(res.data?.[0] || res.data || res);
      setSuccess("Logged in successfully");
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch user");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setToken(null);
      setSuccess("Logged out");
    } catch (err) {
      setError(err.message || "Logout failed");
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <div>{error.message || error}</div>
          {error.details && Array.isArray(error.details) && (
            <ul style={{ margin: 8 }}>
              {error.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Box>

      {!user ? (
        <>
          <div hidden={tab !== 0}>
            {tab === 0 && (
              <LoginForm onSuccess={handleLoginSuccess} onError={(m) => setError(m)} />
            )}
          </div>

          <div hidden={tab !== 1}>
            {tab === 1 && (
              <RegisterForm
                onSuccess={() => {
                  setSuccess("Account created. Please log in.");
                  setTab(0);
                }}
                onError={(m) => setError(m)}
              />
            )}
          </div>
        </>
      ) : (
        <Profile user={user} onLogout={handleLogout} />
      )}
    </>
  );
}
