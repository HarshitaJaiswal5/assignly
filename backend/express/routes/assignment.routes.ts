import { gigController } from "@controller/assignment/assignment.controller.js";
import { requireAuth } from "@middleware/auth.middleware.js";
import { Router } from "express";

const assignmentRouter = Router();

assignmentRouter.use('/', requireAuth);
assignmentRouter.get('/get', gigController.getGigs);
assignmentRouter.get('/:id/details', gigController.getGigDetails);

export default assignmentRouter;