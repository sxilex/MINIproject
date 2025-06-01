import express from "express";
import { applyReferralCode } from "../controllers/referral-use-controller.js";

const router = express.Router();

router.route("/referral").post(applyReferralCode);

export default router;
