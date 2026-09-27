import { gigController } from "@controller/assignment/assignment.controller.js";
import { requireAuth } from "@middleware/auth.middleware.js";
import { Router } from "express";

const assignmentRouter = Router();

assignmentRouter.use('/', requireAuth);
assignmentRouter.get('/get', gigController.getGigs);

export default assignmentRouter;