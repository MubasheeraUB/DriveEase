const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");
const studentRoutes = require("./routes/studentRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const trainingScheduleRoutes = require("./routes/trainingScheduleRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("DriveEase Backend Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/training-schedules", trainingScheduleRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;