import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
  if (!SECRET_CODE) throw new Error("No secret provided");

  const payload = jwt.verify(accessToken, SECRET_CODE);

  if (!payload) {
    res.status(401).json({ message: "Token is wrong dum dum" });
    return;
  }

  req.user = payload;

  next();
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const accesToken = req.cookies.accessToken;

  if (!accesToken) {
    res.status(401).json({ message: "Token is required" });
    return;
  }

  const payload = jwt.verify(accesToken, process.env.JWT_SECRET as string);

  if (!payload) {
    res.status(401).json({ message: "Token verification failed" });
    return;
  }

  req.user = payload;

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
