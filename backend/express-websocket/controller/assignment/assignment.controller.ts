import type { Request, Response } from 'express';
import { gigFilterSchema, gigDetailsSchema } from '@repo/zod-validation/types';
import { ApiResponse } from '@utils/ApiResponse.js';
import { asyncController } from '@utils/asyncController.js';
import { gigServices } from '@services/assignment.services.js';

export const gigController = {
  getGigs: asyncController(async (req: Request, res: Response) => {
    const filters = gigFilterSchema.parse(req.query);
    const gigs = await gigServices.getFilteredGigs(filters);
    return ApiResponse.success(res, gigs, 'Gigs fetched successfully');
  }),

  getGigDetails: asyncController(async (req: Request,res: Response) => {
    const { id } = gigDetailsSchema.parse(req.params);
    const gig = await gigServices.getGigDetails(id);
    return ApiResponse.success(
      res,
      gig,
      'Gig fetched successfully'
    );
  })
};
