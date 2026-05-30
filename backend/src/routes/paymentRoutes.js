const express = require("express");

const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} = require("../controllers/paymentController");

const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE
router.post("/", protect, createPayment);


// GET ALL
router.get("/", protect, getPayments);


// GET SINGLE
router.get("/:id", protect, getPaymentById);


// UPDATE
router.put("/:id", protect, updatePayment);


// DELETE
router.delete("/:id", protect, deletePayment);


module.exports = router;