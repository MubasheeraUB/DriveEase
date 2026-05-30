const prisma = require("../config/db");


// CREATE DRIVER
const createDriver = async (req, res) => {

  try {

    const {
      fullName,
      email,
      phone,
      licenseNumber,
      licenseExpiry,
      vehicleType,
      experienceYears,
      address
    } = req.body;

    // Check existing driver
    const existingDriver = await prisma.driver.findFirst({
      where: {
        OR: [
          { email },
          { licenseNumber }
        ]
      }
    });

    if (existingDriver) {
      return res.status(400).json({
        message: "Driver already exists"
      });
    }

    const driver = await prisma.driver.create({
      data: {
        fullName,
        email,
        phone,
        licenseNumber,
        licenseExpiry: new Date(licenseExpiry),
        vehicleType,
        experienceYears,
        address
      }
    });

    res.status(201).json(driver);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET ALL DRIVERS
const getDrivers = async (req, res) => {

  try {

    const drivers = await prisma.driver.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(drivers);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET SINGLE DRIVER
const getDriverById = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const driver = await prisma.driver.findUnique({
      where: { id }
    });

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found"
      });
    }

    res.status(200).json(driver);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// UPDATE DRIVER
const updateDriver = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const {
      fullName,
      email,
      phone,
      licenseNumber,
      licenseExpiry,
      vehicleType,
      experienceYears,
      address,
      availability,
      status
    } = req.body;

    const existingDriver = await prisma.driver.findUnique({
      where: { id }
    });

    if (!existingDriver) {
      return res.status(404).json({
        message: "Driver not found"
      });
    }

    const updatedDriver = await prisma.driver.update({
      where: { id },
      data: {
        fullName,
        email,
        phone,
        licenseNumber,
        licenseExpiry: new Date(licenseExpiry),
        vehicleType,
        experienceYears,
        address,
        availability,
        status
      }
    });

    res.status(200).json(updatedDriver);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// DELETE DRIVER
const deleteDriver = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingDriver = await prisma.driver.findUnique({
      where: { id }
    });

    if (!existingDriver) {
      return res.status(404).json({
        message: "Driver not found"
      });
    }

    await prisma.driver.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Driver deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver
};