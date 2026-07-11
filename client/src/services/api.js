import axios from "axios";

const API = axios.create({
  baseURL: "https://reservation-system-production-31b0.up.railway.app/api",
});

export default API;