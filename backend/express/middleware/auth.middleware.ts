import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";
import type { JwtPayload as AuthJwtPayload } from "@/types/auth.types.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      success: false,
      message: "JWT secret is not configured",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const payload = decoded as AuthJwtPayload;

    req.user = payload;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};