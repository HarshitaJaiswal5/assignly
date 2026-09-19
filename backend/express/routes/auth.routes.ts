import { Router } from "express";
import { authController } from "@controller/auth/auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/user",
  authController.createOrGetUser
);

export default authRouter;