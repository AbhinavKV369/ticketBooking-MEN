const Bus = require("../model/bus")

async function handleGetHome(req, res) {
  try {
    res.render("user/home", {
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  } 
}

async function handleGetBuses(req, res) {
  try {
    const buses = await Bus.find().populate("route")
    res.render("user/search-buses", {
      buses
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  }
}

async function handleGetAbout(req, res) {
  try {
    res.render("user/about", {
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  }
}

async function handleGetContact(req, res) {
  try {
    res.render("user/contact", {
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("server-error", { message: "Internal Server Error" });
  }
}

module.exports = {
  handleGetHome,
  handleGetBuses,
  handleGetAbout,
  handleGetContact,
};
