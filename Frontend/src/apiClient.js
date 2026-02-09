import axios from "axios";

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.isRefreshing = false;
    this.failedQueue = [];

    this.client.interceptors.response.use(
      (response) => response,
      this.handleResponseError.bind(this)
    );
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  async handleResponseError(error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        }).then(() => this.client(originalRequest)).catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      this.isRefreshing = true;

      try {
        await this.client.post("/auth/refresh", {});
        this.processQueue(null, true);
        return this.client(originalRequest);
      } catch (err) {
        this.processQueue(err, null);
        return Promise.reject(err);
      } finally {
        this.isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }

  async get(url, config = {}) {
    try {
      const response = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await this.client.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await this.client.delete(url, config);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
}

const apiBase = (typeof window !== "undefined" && window.__API_BASE__) || "http://localhost:8001";
const apiClient = new ApiClient(apiBase);

export default apiClient;
