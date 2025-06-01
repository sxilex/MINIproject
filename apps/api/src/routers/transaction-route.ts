import express from "express";
import {
  createTransaction,
  updateTransactionStatus,
} from "../controllers/transaction";
import { verifyToken } from "../middlewares/auth-middlewares";

const router = express.Router();

router.route("/").post(verifyToken, createTransaction);
router.route("/status").post(updateTransactionStatus);

export default router;
