import dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.status(401).json({ message: "Token is Required" });
    return;
  }
  const SECRET_CODE = process.env.SECRET_CODE;
  if (!SECRET_CODE) throw new Error();

  const payload = jwt.verify(accessToken, SECRET_CODE);

  if (!payload) {
    res.status(401).json({ message: "Token is wrong dum dum" });
    return;
  }

  req.user = payload;
  console.log(req.user);
  next();
}

export function roleGuard(...roles: string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    if (roles.includes(user.role)) {
      next();
      return;
    }
    res.status(403).json({ message: `Access Denied` });
  };
}
