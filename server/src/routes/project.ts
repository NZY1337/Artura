import { Router } from "express";
import { errorHandler } from "../middlewares/errorMiddleware";
import { designGenerator, getProjects } from "../controllers/project";
import { authMiddleware } from "../middlewares/authMiddleware";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";
const projectRouter: Router = Router();

projectRouter.post("/design-generator", authMiddleware, uploadMiddleware.array('images', 2), errorHandler(designGenerator));
projectRouter.get("/", authMiddleware, errorHandler(getProjects));

export default projectRouter;
