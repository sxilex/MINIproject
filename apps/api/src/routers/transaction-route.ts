import express from "express";
import {
  createTransaction,
  updateTransactionStatus,
} from "../controllers/transaction.js";
import { verifyToken } from "../middlewares/auth-middlewares.js";

const router = express.Router();

router.route("/").post(verifyToken, createTransaction);
router.route("/status").post(updateTransactionStatus);

export default router;
