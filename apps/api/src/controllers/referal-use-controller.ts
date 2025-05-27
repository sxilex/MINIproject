import { Request, Response } from "express";
import { register } from "./auth-controller";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient()

export async function referalCode(req: Request, res: Response) {
  // check if when the referal code is filled with correct code from user.referalcode, then give the owner of the code 10k points and the user using the code 10%
  const inputRefCode = req.body


  const refCode = await prisma.user.findUnique({where:{referalCode}})

  if (inputRefCode === ){} 

}
