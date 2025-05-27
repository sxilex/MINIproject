import express from "express";
import {
  deleteAll,
  getAllEvents,
  getEventId,
  createEvent,
} from "../controllers/event-controller";
import { authMiddleware, roleGuard } from "../middlewares/auth-middlewares";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getAllEvents)
  .delete(authMiddleware, roleGuard("ADMIN"), deleteAll)
  .post(authMiddleware, roleGuard("ORGANIZER"), createEvent);

router.route("/:eventsId").get(getEventId);

export default router;
