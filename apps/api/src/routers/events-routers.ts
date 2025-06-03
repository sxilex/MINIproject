import express from "express";
import {
  deleteAll,
  getAllEvents,
  getEventId,
  createEvent,
} from "../controllers/event-controller.js";
import { authMiddleware, roleGuard } from "../middlewares/auth-middlewares.js";
import { imageUpload } from "../config/multer.js";

const router = express.Router();

router
  .route("/")
  .get(getAllEvents)
  .delete(authMiddleware, roleGuard("OGANIZER"), deleteAll)
  .post(
    authMiddleware,
    roleGuard("ORGANIZER"),
    imageUpload.fields([{ name: "image", maxCount: 3 }]), // <-- multer middleware
    createEvent
  );

router.route("/:eventsId").get(getEventId);

export default router;
