import { Router } from "express";
import { errorHandler } from "../middlewares/errorMiddleware";
import { updateUserRole, getUsers } from "../controllers/users";

const usersRouter: Router = Router();

usersRouter.put("/:userId/metadata", errorHandler(updateUserRole));
usersRouter.get("/", errorHandler(getUsers));

export default usersRouter;