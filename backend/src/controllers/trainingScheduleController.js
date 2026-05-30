const prisma = require("../config/db");


// CREATE TRAINING SCHEDULE
const createTrainingSchedule = async (req, res) => {

  try {

    const {
      studentId,
      driverId,
      vehicleId,
      trainingDate,
      startTime,
      endTime,
      sessionType,
      remarks
    } = req.body;

    // Validate student
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Validate driver
    const driver = await prisma.driver.findUnique({
      where: { id: driverId }
    });

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found"
      });
    }

    // Validate vehicle
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    const schedule = await prisma.trainingSchedule.create({
      data: {
        studentId,
        driverId,
        vehicleId,
        trainingDate: new Date(trainingDate),
        startTime,
        endTime,
        sessionType,
        remarks
      },

      include: {
        student: true,
        driver: true,
        vehicle: true
      }
    });

    res.status(201).json(schedule);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET ALL TRAINING SCHEDULES
const getTrainingSchedules = async (req, res) => {

  try {

    const schedules = await prisma.trainingSchedule.findMany({

      include: {
        student: true,
        driver: true,
        vehicle: true
      },

      orderBy: {
        trainingDate: "desc"
      }

    });

    res.status(200).json(schedules);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET SINGLE TRAINING SCHEDULE
const getTrainingScheduleById = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const schedule = await prisma.trainingSchedule.findUnique({

      where: { id },

      include: {
        student: true,
        driver: true,
        vehicle: true
      }

    });

    if (!schedule) {
      return res.status(404).json({
        message: "Training schedule not found"
      });
    }

    res.status(200).json(schedule);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// UPDATE TRAINING SCHEDULE
const updateTrainingSchedule = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingSchedule = await prisma.trainingSchedule.findUnique({
      where: { id }
    });

    if (!existingSchedule) {
      return res.status(404).json({
        message: "Training schedule not found"
      });
    }

    const {
      studentId,
      driverId,
      vehicleId,
      trainingDate,
      startTime,
      endTime,
      sessionType,
      status,
      remarks
    } = req.body;

    const updatedSchedule = await prisma.trainingSchedule.update({

      where: { id },

      data: {
        studentId,
        driverId,
        vehicleId,
        trainingDate: new Date(trainingDate),
        startTime,
        endTime,
        sessionType,
        status,
        remarks
      },

      include: {
        student: true,
        driver: true,
        vehicle: true
      }

    });

    res.status(200).json(updatedSchedule);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// DELETE TRAINING SCHEDULE
const deleteTrainingSchedule = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingSchedule = await prisma.trainingSchedule.findUnique({
      where: { id }
    });

    if (!existingSchedule) {
      return res.status(404).json({
        message: "Training schedule not found"
      });
    }

    await prisma.trainingSchedule.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Training schedule deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  createTrainingSchedule,
  getTrainingSchedules,
  getTrainingScheduleById,
  updateTrainingSchedule,
  deleteTrainingSchedule
};