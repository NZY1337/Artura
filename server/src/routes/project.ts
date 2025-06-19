import { Router } from "express";
import { errorHandler } from "../middlewares/errorMiddleware";
import { designGenerator, designGeneratorUpload, getProjects } from "../controllers/project";
import { authMiddleware } from "../middlewares/authMiddleware";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const projectRouter: Router = Router();

projectRouter.post("/design-generator", authMiddleware, errorHandler(designGenerator)); // No files required
projectRouter.post("/design-generator/upload", authMiddleware, uploadMiddleware.array('images', 2), errorHandler(designGeneratorUpload)); // Files required
projectRouter.get("/", authMiddleware, errorHandler(getProjects));

export default projectRouter;
