const prisma = require("../config/db");


// CREATE STUDENT
const createStudent = async (req, res) => {

  try {

    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      guardianName,
      guardianPhone,
      licenseType,
      learningLicenseNo,
      coursePackage
    } = req.body;

    // Check existing student
    if (email) {

      const existingStudent = await prisma.student.findUnique({
        where: { email }
      });

      if (existingStudent) {
        return res.status(400).json({
          message: "Student already exists"
        });
      }

    }

    const student = await prisma.student.create({
      data: {
        fullName,
        email,
        phone,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        address,
        guardianName,
        guardianPhone,
        licenseType,
        learningLicenseNo,
        coursePackage
      }
    });

    res.status(201).json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET ALL STUDENTS
const getStudents = async (req, res) => {

  try {

    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET SINGLE STUDENT
const getStudentById = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const student = await prisma.student.findUnique({
      where: { id }
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// UPDATE STUDENT
const updateStudent = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingStudent = await prisma.student.findUnique({
      where: { id }
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      guardianName,
      guardianPhone,
      licenseType,
      learningLicenseNo,
      coursePackage,
      status
    } = req.body;

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        fullName,
        email,
        phone,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        address,
        guardianName,
        guardianPhone,
        licenseType,
        learningLicenseNo,
        coursePackage,
        status
      }
    });

    res.status(200).json(updatedStudent);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// DELETE STUDENT
const deleteStudent = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingStudent = await prisma.student.findUnique({
      where: { id }
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    await prisma.student.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Student deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};