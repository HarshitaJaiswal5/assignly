import { Request, Response } from "express";
import { AuthenticatedRequest } from "@middleware/auth.middleware.js";
import { ApiResponse } from "@utils/ApiResponse.js";
import { asyncController } from "@utils/asyncController.js";

export class AuthController {
  getProfile = asyncController(
    async (req: AuthenticatedRequest, res: Response) => {

      return ApiResponse.success(
        res,
        {
          user: req.user,
        },
        "User synced successfully"
      );
    }
  );
}

export const authController = new AuthController();