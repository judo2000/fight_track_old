import express from "express";
import {
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/logout", logoutUser);
router.post("/auth", authUser);

export default router;
