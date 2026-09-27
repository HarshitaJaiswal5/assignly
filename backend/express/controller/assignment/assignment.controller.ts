import type { Request, Response } from 'express';

import { gigFilterSchema } from '@repo/zod-validation/types';

import { ApiResponse } from '@utils/ApiResponse.js';
import { asyncController } from '@utils/asyncController.js';

import { getFilteredGigs } from '@services/assignment.services.js';

export const gigController = {
  getGigs: asyncController(async (req: Request, res: Response) => {
    const filters = gigFilterSchema.parse(req.query);
    const gigs = await getFilteredGigs(filters);
    console.log(gigs);
    return ApiResponse.success(res, gigs, 'Gigs fetched successfully');
  }),
};
