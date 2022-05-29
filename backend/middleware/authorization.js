import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      });
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    // attaches data of user along with request
    req.user = await User.findById(tokenData.id);

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const authorizeRoles = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Role: ${req.user.role} is not allowed to access this resouce `,
        });
      }

      next();
    };
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
