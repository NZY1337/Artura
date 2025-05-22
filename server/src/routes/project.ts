import { Router } from "express";
import { errorHandler } from "../middlewares/errorMiddleware";
import { createProject, getProjects } from "../controllers/project";
import { requireAuth, } from '@clerk/express';

const projectRouter: Router = Router();

projectRouter.post("/", requireAuth(), errorHandler(createProject));
projectRouter.get("/", requireAuth(), errorHandler(getProjects));

export default projectRouter;