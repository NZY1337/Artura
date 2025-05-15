import { Router } from "express";
import { errorHandler } from "../middlewares/errorMiddleware";
import { updateUserRole, getUsers, deleteUser } from "../controllers/users";

const usersRouter: Router = Router();

usersRouter.put("/metadata/updateRole", errorHandler(updateUserRole));
usersRouter.get("/", errorHandler(getUsers));
usersRouter.delete("/", errorHandler(deleteUser));

export default usersRouter;