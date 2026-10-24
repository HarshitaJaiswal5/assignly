import type { Request, Response } from 'express';
import { gigFilterSchema, gigDetailsSchema, createAssignmentSchema } from '@repo/zod-validation/types';
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
  }),
<<<<<<< HEAD

    getPostedAssignments: asyncController(
    async (req: Request, res: Response) => {
      const userId = req.user.id;

      const assignments =
        await gigServices.getPostedAssignments(userId);

      return ApiResponse.success(
        res,
        assignments,
        'Posted assignments fetched successfully',
      );
    },
  ),

  getRequestedAssignments: asyncController(
    async (req: Request, res: Response) => {
      const userId = req.user.id;

      const assignments =
        await gigServices.getRequestedAssignments(userId);

      return ApiResponse.success(
        res,
        assignments,
        'Requested assignments fetched successfully',
      )},
    ),
=======
  
>>>>>>> origin/harshita/upload-assignment-pipeline
  createAssignment: asyncController(
    async (req: Request, res: Response) => {
      const assignmentData = createAssignmentSchema.parse(req.body);

      const assignment = await gigServices.createAssignment(
        assignmentData,
        req.user.id,
      );

      return ApiResponse.success(
        res,
        assignment,
        'Assignment created successfully',
      );
    },
  ),
};
