import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controller/userController.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middleware/authorization.js";

// Router
const userRouter = express.Router();

// routes
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logout);

// password
userRouter.route("/password/forgot").post(forgotPassword);
userRouter.route("/password/reset/:token").put(resetPassword);
userRouter.route("/password/update").put(isAuthenticatedUser, updatePassword);

// me
userRouter.route("/me").get(isAuthenticatedUser, getUserDetails);
userRouter.route("/me/update").put(isAuthenticatedUser, updateProfile);

// admin routes
userRouter
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

userRouter
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

export default userRouter;
