const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// connect DB
//connectDB();

// ✅ STEP 1: enable CORS FIRST
app.use(cors());

// ✅ STEP 2: explicitly allow preflight
app.options("*", cors());

// parse json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Travel Itinerary Planner Backend is running");
});

const itineraryRoutes = require("./routes/itineraryRoutes");
app.use("/api/itinerary", itineraryRoutes);

module.exports = app;
