const prisma = require("../config/db");


// MARK ATTENDANCE
const markAttendance = async (req, res) => {

  try {

    const {
      trainingScheduleId,
      attendanceDate,
      status,
      remarks
    } = req.body;

    // Check schedule
    const schedule = await prisma.trainingSchedule.findUnique({
      where: {
        id: trainingScheduleId
      }
    });

    if (!schedule) {
      return res.status(404).json({
        message: "Training schedule not found"
      });
    }

    const attendance = await prisma.attendance.create({

      data: {
        trainingScheduleId,
        attendanceDate: new Date(attendanceDate),
        status,
        remarks
      },

      include: {

        trainingSchedule: {
          include: {
            student: true,
            driver: true,
            vehicle: true
          }
        }

      }

    });

    res.status(201).json(attendance);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET ALL ATTENDANCES
const getAttendances = async (req, res) => {

  try {

    const attendances = await prisma.attendance.findMany({

      include: {

        trainingSchedule: {
          include: {
            student: true,
            driver: true,
            vehicle: true
          }
        }

      },

      orderBy: {
        attendanceDate: "desc"
      }

    });

    res.status(200).json(attendances);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET SINGLE ATTENDANCE
const getAttendanceById = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const attendance = await prisma.attendance.findUnique({

      where: { id },

      include: {

        trainingSchedule: {
          include: {
            student: true,
            driver: true,
            vehicle: true
          }
        }

      }

    });

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found"
      });
    }

    res.status(200).json(attendance);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// UPDATE ATTENDANCE
const updateAttendance = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingAttendance = await prisma.attendance.findUnique({
      where: { id }
    });

    if (!existingAttendance) {
      return res.status(404).json({
        message: "Attendance not found"
      });
    }

    const {
      attendanceDate,
      status,
      remarks
    } = req.body;

    const updatedAttendance = await prisma.attendance.update({

      where: { id },

      data: {
        attendanceDate: new Date(attendanceDate),
        status,
        remarks
      },

      include: {

        trainingSchedule: {
          include: {
            student: true,
            driver: true,
            vehicle: true
          }
        }

      }

    });

    res.status(200).json(updatedAttendance);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// DELETE ATTENDANCE
const deleteAttendance = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingAttendance = await prisma.attendance.findUnique({
      where: { id }
    });

    if (!existingAttendance) {
      return res.status(404).json({
        message: "Attendance not found"
      });
    }

    await prisma.attendance.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Attendance deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  markAttendance,
  getAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
};