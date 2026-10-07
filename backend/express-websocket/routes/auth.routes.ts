import { Router } from "express";
import { authController } from "@controller/auth/auth.controller.js";
import { requireAuth } from "@middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post(
  "/user",
  requireAuth,
  authController.getProfile
);

export default authRouter;