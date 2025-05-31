import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  try {
    const { username, firstname, lastname, email, password, referralcode } =
      req.body;

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    let referredbyId: string | null = null;

    // Check if the referral code exists (for any user role)
    if (referralcode && referralcode.trim() !== "") {
      const referrer = await prisma.user.findUnique({
        where: { referralcode },
      });

      if (referrer) {
        referredbyId = referrer.id;

        // 1️⃣ Give the referrer 10,000 points, expires in 3 months
        await prisma.point.create({
          data: {
            userId: referrer.id,
            amount: 10_000,
            expiredAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          },
        });
      }
    }

    // 2️⃣ Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        referralcode:
          firstname.slice(0, 4) + Math.random().toString(36).slice(0, 6),
        referredby: referredbyId ?? null,
      },
    });

    // 3️⃣ If referredbyId exists, give the new user a 10% discount coupon
    if (referredbyId) {
      await prisma.coupon.create({
        data: {
          userId: newUser.id,
          discount: 10,
          expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        },
      });
    }

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    const existingAccount = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (!existingAccount) {
      res.status(404).json({ message: "Account not Found!" });
      return;
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingAccount.password
    );

    if (!isValidPassword) {
      res.status(400).json({ message: "Password maybe incorrect" });
    }

    const accesstoken = jwt.sign(
      {
        id: existingAccount.id,
        username: existingAccount.username,
        email: existingAccount.email,
        role: existingAccount.role,
        name: existingAccount.firstname + existingAccount.lastname,
      },
      "supersecretwow"
    );

    res
      .cookie("accessToken", accesstoken)
      .status(200)
      .json({ message: `Welcome ${username}` });
  } catch (error) {
    res.status(500).json({ message: "failed to register" });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "Logout Success!" });
  } catch (error) {
    res.status(500).json({ message: "Logout Failed" });
  }
}
