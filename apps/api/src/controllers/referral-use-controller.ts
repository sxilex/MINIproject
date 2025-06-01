import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function applyReferralCode(req: Request, res: Response) {
  try {
    const { userId, referralcode } = req.body;

    if (!referralcode || !userId) {
      res
        .status(400)
        .json({ message: "Referral code and userId are required." });
      return;
    }

    const referrer = await prisma.user.findUnique({
      where: { referralcode },
    });

    if (!referrer) {
      res.status(404).json({ message: "Referral code not found." });
      return;
    }

    // Create coupon for the user
    await prisma.coupon.create({
      data: {
        userId,
        discount: 10,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months
      },
    });

    // Add 10k points to the referrer
    await prisma.point.create({
      data: {
        userId: referrer.id,
        amount: 10000,
        createdAt: new Date(),
        expiredAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months
      },
    });

    res.status(200).json({ message: "Referral successfully applied." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
}
