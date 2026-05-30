const bcrypt = require("bcryptjs");
const prisma = require("../config/db");
const generateToken = require("../utils/generateToken");


// REGISTER USER
const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check existing user
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  registerUser,
  loginUser
};