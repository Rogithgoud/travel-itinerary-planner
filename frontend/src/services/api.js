import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const generateItinerary = async (formData) => {
  const response = await api.post("/itinerary/generate", formData);
  return response.data;
};
