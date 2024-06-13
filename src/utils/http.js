import axios from "axios";

export const createHttpClient = (baseURL, headers) => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  client.interceptors.response.use((response) => response.data);
  return client;
};
