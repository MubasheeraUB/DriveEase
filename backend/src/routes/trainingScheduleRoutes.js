const express = require("express");

const {
  createTrainingSchedule,
  getTrainingSchedules,
  getTrainingScheduleById,
  updateTrainingSchedule,
  deleteTrainingSchedule
} = require("../controllers/trainingScheduleController");

const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE
router.post("/", protect, createTrainingSchedule);


// GET ALL
router.get("/", protect, getTrainingSchedules);


// GET SINGLE
router.get("/:id", protect, getTrainingScheduleById);


// UPDATE
router.put("/:id", protect, updateTrainingSchedule);


// DELETE
router.delete("/:id", protect, deleteTrainingSchedule);


module.exports = router;