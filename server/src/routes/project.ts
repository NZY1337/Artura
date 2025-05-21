import { Router } from "express";
import { errorHandler } from "../middlewares/errorMiddleware";
import { createProject } from "../controllers/project";

const projectRouter: Router = Router();

projectRouter.post("/", errorHandler(createProject));

export default projectRouter;