import { Router } from "express";
import { errorHandler } from "../middlewares/errorMiddleware";
import { createProject, getProjects } from "../controllers/project";
import { authMiddleware } from "../middlewares/authMiddleware";

const projectRouter: Router = Router();

projectRouter.post("/", authMiddleware, errorHandler(createProject));
projectRouter.get("/", authMiddleware, errorHandler(getProjects));

export default projectRouter;