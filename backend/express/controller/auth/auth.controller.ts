import { Request, Response } from "express";
import { authService } from "@services/auth.services.js";
import { ApiResponse } from "@utils/ApiResponse.js";
import { asyncController } from "@utils/asyncController.js";

export class AuthController {
  createOrGetUser = asyncController(
    async (req: Request, res: Response) => {
      const user = await authService.createOrGetUser(
        req.body
      );

      return ApiResponse.success(
        res,
        user,
        "User synced successfully"
      );
    }
  );
}

export const authController = new AuthController();