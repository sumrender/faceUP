import app from "./app.js";
import connectDB from "./database/db.js";

import dotenv from "dotenv";
import cloudinary from "cloudinary";

// env
dotenv.config();

// database
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`);
});
