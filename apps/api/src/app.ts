import "dotenv/config";

import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routers/user-router.js";
import eventsRouters from "./routers/events-routers.js";
import authRouters from "./routers/auth-routers.js";
import referralRouter from "./routers/referral-use-router.js";
import transactionRouter from "./routers/transaction-route.js";
import { TicketData } from "./types/interfaces.js";

const app: Application = express();
const PORT: number = 2012;

// app.post("/api/v1/events", (req, res) => {
//   const { tickets } = req.body; // Assuming tickets is an array sent in JSON format

//   // Parse each ticket's quantity and price
//   tickets.forEach((ticket: TicketData) => {
//     ticket.quantity = ticket.quantity as number; // Convert to int
//     ticket.price = ticket.price; // Convert to float
//   });

//   // Now save the event with the correctly parsed data
//   // your database logic here

//   res.json({ message: "Event created successfully!" });
// });

app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/status", (req: Request, res: Response) => {
  res.status(200).json({ message: "API running away" });
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/v1/events", eventsRouters);
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/referral", referralRouter);
app.use("/api/v1/transacttion", transactionRouter);

app.listen(PORT, () => {
  console.info(`server is running on http://localhost:${PORT}`);
});
