const express = require("express");

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE
router.post("/", protect, createStudent);


// GET ALL
router.get("/", protect, getStudents);


// GET SINGLE
router.get("/:id", protect, getStudentById);


// UPDATE
router.put("/:id", protect, updateStudent);


// DELETE
router.delete("/:id", protect, deleteStudent);


module.exports = router;