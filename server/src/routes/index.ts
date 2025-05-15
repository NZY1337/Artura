import { Router } from "express";
import usersRouter from "./users";

import { clerkMiddleware } from "@clerk/express";

const rootRouter: Router = Router();

rootRouter.use("/users", usersRouter);

export default rootRouter;
