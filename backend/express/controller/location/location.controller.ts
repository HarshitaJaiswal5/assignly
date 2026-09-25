import { Request, Response } from "express";

import { ApiResponse } from "@utils/ApiResponse.js";
import { BadRequestError } from "@utils/ApiError.js";
import { asyncController } from "@utils/asyncController.js";

import {
  autocompleteLocation,
  reverseGeocode,
} from "@services/location.services.js";

export class LocationController {
  autocomplete = asyncController(
    async (req: Request, res: Response) => {
      const { text } = req.query;

      if (!text || typeof text !== "string") {
        throw new BadRequestError("Search text is required");
      }

      const data = await autocompleteLocation(text);

      return ApiResponse.success(
        res,
        data,
        "Locations fetched successfully"
      );
    }
  );

  reverse = asyncController(
    async (req: Request, res: Response) => {
      const { lat, lon } = req.query;

      const latitude = Number(lat);
      const longitude = Number(lon);

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        throw new BadRequestError(
          "Valid latitude and longitude are required"
        );
      }

      if (latitude < -90 || latitude > 90) {
        throw new BadRequestError(
          "Latitude must be between -90 and 90"
        );
      }

      if (longitude < -180 || longitude > 180) {
        throw new BadRequestError(
          "Longitude must be between -180 and 180"
        );
      }

      const data = await reverseGeocode(latitude, longitude);
        return ApiResponse.success(
        res,
        data,
        "Location fetched successfully"
      );
    }
  );
}

export const locationController = new LocationController();