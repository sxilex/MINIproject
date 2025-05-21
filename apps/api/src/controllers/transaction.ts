import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

export async function transaction(req: Request, res: Response) {
  try {
    const userId = req.user.id;
  
    await 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
}
