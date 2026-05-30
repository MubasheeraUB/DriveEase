const express = require("express");

const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} = require("../controllers/vehicleController");

const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE
router.post("/", protect, createVehicle);


// GET ALL
router.get("/", protect, getVehicles);


// GET SINGLE
router.get("/:id", protect, getVehicleById);


// UPDATE
router.put("/:id", protect, updateVehicle);


// DELETE
router.delete("/:id", protect, deleteVehicle);


module.exports = router;