import { Router } from "express";
import { errorHandler } from "../middlewares/errorMiddleware";
import { designEditor, designGenerator, getProjects } from "../controllers/project";
import { authMiddleware } from "../middlewares/authMiddleware";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const projectRouter: Router = Router();

projectRouter.post("/design-editor", authMiddleware, uploadMiddleware.array('images', 2), errorHandler(designEditor));
projectRouter.post("/design-generator", authMiddleware, errorHandler(designGenerator));
projectRouter.get("/", authMiddleware, errorHandler(getProjects));

export default projectRouter;
