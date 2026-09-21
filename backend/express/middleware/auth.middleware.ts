import {
  NextFunction,
  Request,
  Response,
} from "express";

import { authService } from "@services/auth.services.js";
import { AuthenticatedUser } from "@shared-types/auth.types.js";

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const sessionToken =
      req.cookies?.["authjs.session-token"] ??
      req.cookies?.["__Secure-authjs.session-token"];

    if (!sessionToken) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const user = await authService.getAuthenticatedUser(
      sessionToken,
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid or expired session",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}