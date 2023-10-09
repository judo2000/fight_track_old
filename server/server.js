import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.listen(port, () =>
  console.log(`Server running on port ${port}`.magenta.bold)
);
