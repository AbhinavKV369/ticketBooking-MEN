const User = require("../model/user");
const Bus = require("../model/bus");
const Route = require("../model/route");
const Booking = require("../model/booking");

async function handleGetAdminDashboard(req, res) {
  try {
    res.status(200).render("admin/dashboard");
  } catch (err) {
    res.status(500).json({ message: "Error loading dashboard", error: err.message });
  }
}

async function handleGetUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).render("admin/manage-users", { users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
}

async function handleGetAddBus(req, res) {
  try {
    const routes = await Route.find();
    res.status(200).render("admin/add-bus", { routes });
  } catch (err) {
    res.status(500).json({ message: "Error loading add bus page", error: err.message });
  }
}

async function handlePostAddBus(req, res) {
  const {
    busName,
    busNumber,
    type,
    totalSeats,
    availableSeats,
    route,
    departureTime,
    arrivalTime,
    daysAvailable
  } = req.body;

  const routes = await Route.find();

  if (!busName || !busNumber || !type || !totalSeats || !route) {
    return res
      .status(400)
      .render("admin/add-bus", { routes, message: "All required fields must be filled" });
  }

  try {
    const newBus = new Bus({
      busName,
      busNumber,
      type,
      totalSeats,
      availableSeats,
      route,
      departureTime,
      arrivalTime,
      daysAvailable: Array.isArray(daysAvailable) ? daysAvailable : [daysAvailable]
    });

    await newBus.save();

    res.status(200).render("admin/add-bus", { routes, message: "New Bus Added Successfully" });
  } catch (err) {
    res.status(500).render("admin/add-bus", {
      routes,
      message: "Error adding bus: " + err.message
    });
  }
}

async function handleGetBuses(req, res) {
  try {
    const buses = await Bus.find().populate("route");
    res.status(200).render("admin/manage-buses", { buses });
  } catch (err) {
    res.status(500).json({ message: "Error fetching buses", error: err.message });
  }
}

async function handleGetAddRoute(req, res) {
  try {
    res.status(200).render("admin/add-routes");
  } catch (err) {
    res.status(500).json({ message: "Error loading add route page", error: err.message });
  }
}

async function handlePostAddRoute(req, res) {
  const { from, to, price, distanceKm, estimatedDuration } = req.body;

  if (!from || !to || !price || !distanceKm || !estimatedDuration) {
    return res
      .status(400)
      .render("admin/add-routes", { message: "All fields are required" });
  }

  try {
    const newRoute = new Route({
      from,
      to,
      price,
      distanceKm,
      estimatedDuration
    });

    await newRoute.save();
    res.status(200).render("admin/add-routes", { message: "New Route Added" });
  } catch (err) {
    res.status(500).render("admin/add-routes", {
      message: "Error adding route: " + err.message
    });
  }
}

async function handleGetRoutes(req, res) {
  try {
    const routes = await Route.find();
    res.status(200).render("admin/manage-routes", { routes });
  } catch (err) {
    res.status(500).json({ message: "Error fetching routes", error: err.message });
  }
}

async function handleGetBookings(req, res) {
  try {
    const bookings = await Booking.find().populate("user bus route");
    res.status(200).render("admin/view-bookings", { bookings });
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
}

module.exports = {
  handleGetAdminDashboard,
  handleGetUsers,
  handleGetAddBus,
  handlePostAddBus,
  handleGetBuses,
  handleGetAddRoute,
  handlePostAddRoute,
  handleGetRoutes,
  handleGetBookings,
};
