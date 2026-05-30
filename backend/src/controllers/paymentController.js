const prisma = require("../config/db");


// CREATE PAYMENT
const createPayment = async (req, res) => {

  try {

    const {
      studentId,
      totalAmount,
      paidAmount,
      paymentDate,
      paymentMethod,
      remarks
    } = req.body;

    // Check student
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Calculate balance
    const balanceAmount = totalAmount - paidAmount;

    // Payment status
    let paymentStatus = "partial";

    if (balanceAmount <= 0) {
      paymentStatus = "paid";
    }

    const payment = await prisma.payment.create({

      data: {
        studentId,
        totalAmount,
        paidAmount,
        balanceAmount,
        paymentDate: new Date(paymentDate),
        paymentMethod,
        paymentStatus,
        remarks
      },

      include: {
        student: true
      }

    });

    res.status(201).json(payment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET ALL PAYMENTS
const getPayments = async (req, res) => {

  try {

    const payments = await prisma.payment.findMany({

      include: {
        student: true
      },

      orderBy: {
        paymentDate: "desc"
      }

    });

    res.status(200).json(payments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET SINGLE PAYMENT
const getPaymentById = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const payment = await prisma.payment.findUnique({

      where: { id },

      include: {
        student: true
      }

    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    res.status(200).json(payment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// UPDATE PAYMENT
const updatePayment = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingPayment = await prisma.payment.findUnique({
      where: { id }
    });

    if (!existingPayment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    const {
      totalAmount,
      paidAmount,
      paymentDate,
      paymentMethod,
      remarks
    } = req.body;

    const balanceAmount = totalAmount - paidAmount;

    let paymentStatus = "partial";

    if (balanceAmount <= 0) {
      paymentStatus = "paid";
    }

    const updatedPayment = await prisma.payment.update({

      where: { id },

      data: {
        totalAmount,
        paidAmount,
        balanceAmount,
        paymentDate: new Date(paymentDate),
        paymentMethod,
        paymentStatus,
        remarks
      },

      include: {
        student: true
      }

    });

    res.status(200).json(updatedPayment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// DELETE PAYMENT
const deletePayment = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingPayment = await prisma.payment.findUnique({
      where: { id }
    });

    if (!existingPayment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    await prisma.payment.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Payment deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment
};