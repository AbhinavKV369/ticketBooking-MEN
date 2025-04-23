const express = require("express");
const router = express.Router();

const {
  handleGetAdminDashboard,
  handleGetUsers,
  handleGetAddBus,
  handlePostAddBus,
  handleGetBuses,
  handleGetAddRoute,
  handlePostAddRoute,
  handleGetRoutes,
  handleGetBookings
} = require("../controllers/admin");

// Admin Dashboard
router.get("/", handleGetAdminDashboard);

// Users
router.get("/manage-users", handleGetUsers);

// Buses
router.get("/manage-buses", handleGetBuses);
router.get("/add-bus", handleGetAddBus);
router.post("/add-bus", handlePostAddBus);

// Routes
router.get("/manage-routes", handleGetRoutes);
router.get("/add-routes", handleGetAddRoute);
router.post("/add-routes", handlePostAddRoute);

// Bookings
router.get("/view-bookings", handleGetBookings);

module.exports = router;
