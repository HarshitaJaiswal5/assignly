
import { Router } from 'express';

import { applicationController } from '@controller/application/application.controller.js';
import { requireAuth } from '@middleware/auth.middleware.js';

const applicationRouter = Router();

applicationRouter.post(
  '/:id/apply',
  requireAuth,
  applicationController.createApplication,
);

export { applicationRouter };
