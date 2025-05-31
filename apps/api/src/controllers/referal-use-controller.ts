import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function refInput(req: Request, res: Response) {
  // check if when the referal code is filled with correct code from user.referalcode, then give the owner of the code 10k points and the user using the code 10%

  const { referralcode } = req.body;

  let referredbyId: string | null = null;

  if (referralcode && referralcode.trim() !== "") {
    const referrer = await prisma.user.findUnique({
      where: { referralcode },
    });

    if (referrer) {
      referredbyId = referrer.id;

      await prisma.point.create({
        data: {
          userId: referrer.id,
          amount: 10_000,
          expiredAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        },
      });
    }
  }
}

export async function coupons(req: Request, res: Response) {}
