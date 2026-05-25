import axios from "axios";

const api = axios.create({
  baseURL:
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const fetchMetrics =
  async () => {
    const response =
      await api.get("/metrics");

    return response.data;
  };

export const analyzeLog =
  async (formData) => {
    const response =
      await api.post(
        "/logs/analyze",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };

export default api;