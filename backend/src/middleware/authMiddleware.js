const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.id
        }
      });

      next();

    } catch (error) {

      return res.status(401).json({
        message: "Not authorized"
      });

    }

  }

  if (!token) {
    return res.status(401).json({
      message: "No token"
    });
  }

};

module.exports = {
  protect
};