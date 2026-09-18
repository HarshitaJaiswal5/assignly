import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { ZodError } from "zod";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  // Zod validation error
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });
  }

  // Known application error
  if (error instanceof Error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};