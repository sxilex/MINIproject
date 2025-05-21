import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import fs from "fs/promises";
import hadlebars from "handlebars";

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  try {
    const { firstname, lastname, email, username, password } = req.body;

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.createMany({
      data: {
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        referalCode:
          firstname.slice(0, 4) + Math.random().toString(36).slice(0, 6),
      },
    });
    res.status(201).json({ message: "Registered, Welcome" });
  } catch (error) {
    res.status(500).json({ message: "failed to register" });
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
