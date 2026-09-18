import type { Auth } from "./auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: Auth.JwtPayload;
    }
  }
}

export {};