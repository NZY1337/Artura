import { BadRequestException, ErrorCode, NotFoundException, UnauthorizedException } from "../middlewares/errorMiddleware";
import { Request, Response, NextFunction } from 'express';
import { clerkMiddleware, getAuth } from '@clerk/express'


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);
    console.log(auth.userId);

    if (!auth.userId) {
        // User is not authenticated        
        // throw new BadRequestException(400, "Bad Request");}
        // return res.redirect('/login');
        throw new UnauthorizedException(ErrorCode.UNAUTHORIZED, 'You need to login first')
    }

    req.auth = auth;

    next();
}