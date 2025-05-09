import axios from "axios";
export const apiBackend = axios.create({
  baseURL: "https://6f48nr8nnj.execute-api.us-east-1.amazonaws.com",
  timeout: 1000,
});
