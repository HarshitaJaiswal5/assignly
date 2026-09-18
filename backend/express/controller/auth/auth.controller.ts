import type { Request, Response } from "express";

import { AuthService } from "@/services/auth.services.js";

export const googleLogin = async (
  req: Request,
  res: Response
) => {
  const { credential } = req.body;

  const result =
    await AuthService.loginWithGoogle(credential);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};