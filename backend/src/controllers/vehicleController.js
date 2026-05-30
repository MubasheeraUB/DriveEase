const prisma = require("../config/db");


// CREATE VEHICLE
const createVehicle = async (req, res) => {

  try {

    const {
      vehicleName,
      vehicleNumber,
      vehicleType,
      brand,
      model,
      fuelType,
      registrationDate,
      insuranceExpiry,
      rcExpiry,
      pollutionExpiry,
      seatingCapacity
    } = req.body;

    // Check existing vehicle
    const existingVehicle = await prisma.vehicle.findUnique({
      where: {
        vehicleNumber
      }
    });

    if (existingVehicle) {
      return res.status(400).json({
        message: "Vehicle already exists"
      });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        vehicleName,
        vehicleNumber,
        vehicleType,
        brand,
        model,
        fuelType,
        registrationDate: new Date(registrationDate),
        insuranceExpiry: new Date(insuranceExpiry),
        rcExpiry: new Date(rcExpiry),
        pollutionExpiry: new Date(pollutionExpiry),
        seatingCapacity
      }
    });

    res.status(201).json(vehicle);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET ALL VEHICLES
const getVehicles = async (req, res) => {

  try {

    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(vehicles);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET SINGLE VEHICLE
const getVehicleById = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const vehicle = await prisma.vehicle.findUnique({
      where: { id }
    });

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    res.status(200).json(vehicle);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// UPDATE VEHICLE
const updateVehicle = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id }
    });

    if (!existingVehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    const {
      vehicleName,
      vehicleNumber,
      vehicleType,
      brand,
      model,
      fuelType,
      registrationDate,
      insuranceExpiry,
      rcExpiry,
      pollutionExpiry,
      seatingCapacity,
      status,
      availability
    } = req.body;

    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        vehicleName,
        vehicleNumber,
        vehicleType,
        brand,
        model,
        fuelType,
        registrationDate: new Date(registrationDate),
        insuranceExpiry: new Date(insuranceExpiry),
        rcExpiry: new Date(rcExpiry),
        pollutionExpiry: new Date(pollutionExpiry),
        seatingCapacity,
        status,
        availability
      }
    });

    res.status(200).json(updatedVehicle);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// DELETE VEHICLE
const deleteVehicle = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id }
    });

    if (!existingVehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    await prisma.vehicle.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Vehicle deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};