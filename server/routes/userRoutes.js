import express from "express";
import { logoutUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/logout", logoutUser);
export default router;
