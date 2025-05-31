import "dotenv/config";

import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routers/user-router.js";
import eventsRouters from "./routers/events-routers.js";
import authRouters from "./routers/auth-routers.js";

const app: Application = express();
const PORT: number = 2012;

app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/status", (req: Request, res: Response) => {
  res.status(200).json({ message: "API running away" });
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/v1/events", eventsRouters);
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.info(`server is running on http://localhost:${PORT}`);
});
