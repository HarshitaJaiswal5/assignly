import type { Response } from 'express';

import {
  applicationParamsSchema,
  createApplicationSchema,
} from '@repo/zod-validation/types';

import type { AuthenticatedRequest } from '@middleware/auth.middleware.js';
import { applicationService } from '@services/application.services.js';
import { ApiResponse } from '@utils/ApiResponse.js';
import { asyncController } from '@utils/asyncController.js';

export const applicationController = {
  createApplication: asyncController(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id: gigId } = applicationParamsSchema.parse(req.params);
      const { negotiatedPrice } = createApplicationSchema.parse(req.body);

      const application = await applicationService.createApplication({
        gigId,
        userId: req.user.id ,
        negotiatedPrice,
      });

      return ApiResponse.created(
        res,
        application,
        'Application submitted successfully',
      );
    },
  ),
};
