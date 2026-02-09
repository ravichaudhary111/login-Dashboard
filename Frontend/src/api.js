import apiClient from "./apiClient";

export async function loginRequest(email, password) {
  return await apiClient.post("/auth/login", { email, password });
}

export async function registerRequest(payload) {
  return await apiClient.post("/user", payload);
}

export async function getUser(id, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return await apiClient.get(`/user/${id}`, { headers });
}

export async function logoutRequest() {
  return await apiClient.post(`/auth/logout`);
}

export default { loginRequest, registerRequest, getUser, logoutRequest };
