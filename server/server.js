import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running on port ${port}`.magenta.bold)
);
