import { Router } from "express";
import { errorHandler } from "../middlewares/errorMiddleware";
import { designGenerator, getProjects } from "../controllers/project";
import { authMiddleware } from "../middlewares/authMiddleware";

const projectRouter: Router = Router();

projectRouter.post(
    "/design-generator",
    authMiddleware,
    errorHandler(designGenerator)
);
projectRouter.get("/", authMiddleware, errorHandler(getProjects));

export default projectRouter;
786;
