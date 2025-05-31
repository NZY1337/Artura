import {
  BadRequestException,
  ErrorCode,
  NotFoundException,
  UnauthorizedException,
} from "../middlewares/errorMiddleware";
import { Request, Response, NextFunction } from "express";
import { clerkMiddleware, getAuth } from "@clerk/express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  console.log(auth.userId, "from hook");

  if (!auth.userId) {
    throw new UnauthorizedException(
      ErrorCode.UNAUTHORIZED,
      "You need to login first"
    );
  }

  req.auth = auth;

  next();
};
