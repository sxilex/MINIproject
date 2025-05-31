import express from "express";
import { getCurrentUser } from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middlewares.js";

const router = express.Router();

router.route("/current-user").get(authMiddleware, getCurrentUser);

export default router;
