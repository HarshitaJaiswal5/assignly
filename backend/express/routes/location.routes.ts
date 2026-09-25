import { locationController } from "@controller/location/location.controller.js";
import { requireAuth } from "@middleware/auth.middleware.js";
import { Router } from "express";

const locationRouter = Router();

locationRouter.use('/', requireAuth);

locationRouter.get("/address", locationController.reverse);
locationRouter.get("/suggestions", locationController.autocomplete);

export default locationRouter;