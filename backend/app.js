// npm packages
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
// routes
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";
import errorMiddleware from "./middleware/error.js";
import cors from "cors"

// initialize server
const app = express();
app.use(cors())

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// routes
app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
app.use("/api/v1", payment);
app.get("/api/v1/test", (req, res) => {
  console.log("test");
  res.status(200).json({
    success: true,
    message: "test request received",
  });
});

export default app;
