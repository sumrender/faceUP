import User from "../model/userModel.js";
import sendToken from "../utils/jwtToken.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// Register a User
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, image } = req.body;

  const newUserData = { name, email, password };
  if (image !== "") {
    newUserData.image = image;
  }
  const user = await User.create(newUserData);

  sendToken(user, 201, res);
});

// Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email or password field empty",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No User Found",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  sendToken(user, 200, res);
});

// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Get ResetPassword Token
  const resetToken = "628b26a3e4bc9284915c733f";

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  // try {
  //   await sendEmail({
  //     email: user.email,
  //     subject: `Ecommerce Password Recovery`,
  //     message,
  //   });

  //   res.status(200).json({
  //     success: true,
  //     message: `Email sent to ${user.email} successfully`,
  //   });
  // } catch (error) {
  //   user.resetPasswordToken = undefined;
  //   user.resetPasswordExpire = undefined;

  //   await user.save({ validateBeforeSave: false });

  //   return res.status(500).json({
  //     success: false,
  //     message: `Email not sent:Interval Server Error ${message}`,
  //   });
  // }
  return res.status(500).json({
    success: false,
    message: `Email not sent:Interval Server Error ${message}`,
  });
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  // const resetPasswordToken = crypto
  //   .createHash("sha256")
  //   .update(req.params.token)
  //   .digest("hex");

  // const user = await User.findOne({
  //   resetPasswordToken,
  //   resetPasswordExpire: { $gt: Date.now() },
  // });
  const resetToken = req.params.token;
  if (resetToken !== "628b26a3e4bc9284915c733f") {
    res.status(400).json({
      success: false,
      message: "resetToken invalid",
    });
  }
  const email = req.body.email;
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "reset token expired",
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.image !== "") {
    newUserData.image = req.body.image;
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all users(admin)
export const getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist.",
    });
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
