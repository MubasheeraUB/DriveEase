const express = require("express");

const {
  markAttendance,
  getAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
} = require("../controllers/attendanceController");

const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE
router.post("/", protect, markAttendance);


// GET ALL
router.get("/", protect, getAttendances);


// GET SINGLE
router.get("/:id", protect, getAttendanceById);


// UPDATE
router.put("/:id", protect, updateAttendance);


// DELETE
router.delete("/:id", protect, deleteAttendance);


module.exports = router;