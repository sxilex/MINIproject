import { Request, Response } from "express";
import { register } from "./auth-controller";

export async function referalCode(req: Request, res: Response) {
  // check if when the referal code is filled with correct code from user.referalcode, then give the owner of the code 10k points and the user using the code 10%
}
