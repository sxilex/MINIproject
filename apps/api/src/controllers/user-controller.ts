import { Request, Response } from "express";

export async function getCurrentUser(req: Request, res: Response) {
  try {
    const userData = req.user;
    res.status(200).json({ data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to get current user" });
  }
}
