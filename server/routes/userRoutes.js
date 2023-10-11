import express from "express";
import {
  authUser,
  google,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router.post("/google", google);

export default router;
