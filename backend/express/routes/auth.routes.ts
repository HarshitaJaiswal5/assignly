import { Router } from "express";

import { googleLogin } from "@/controller/auth/auth.controller.js";
import { validate } from "@/middleware/validate.middleware.js";
import { googleLoginSchema } from "@/schemas/auth.schema.js";

const authRouter = Router();

authRouter.post(
  "/google",
  validate(googleLoginSchema),
  googleLogin
);

export default authRouter;