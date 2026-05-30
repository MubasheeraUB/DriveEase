const express = require("express");

const {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver
} = require("../controllers/driverController");

const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE
router.post("/", protect, createDriver);


// GET ALL
router.get("/", protect, getDrivers);


// GET SINGLE
router.get("/:id", protect, getDriverById);


// UPDATE
router.put("/:id", protect, updateDriver);


// DELETE
router.delete("/:id", protect, deleteDriver);


module.exports = router;