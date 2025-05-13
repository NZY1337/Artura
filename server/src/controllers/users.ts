import { Request, Response } from "express";
import express from 'express';
import { clerkClient } from "@clerk/express";
import { prismaClient } from "../utils/prismaClient";
import { BadRequestException } from "../middlewares/errorMiddleware";
const router = express.Router();

/**
 * Updates a user's public metadata in Clerk.
 *
 * @param userId - The Clerk user ID (e.g., 'user_abc123')
 * @param metadata - An object with public metadata to update (e.g., { role: 'admin' })
 * @returns The updated Clerk user object
 */

// api/users/:userId/metadata
export const updateUserRole = async (req: Request, res: Response) => {
    const { role } = req.body;
    if (!role) {
        throw new BadRequestException(400, "Role is required");
    }

    const { userId } = req.params;
    clerkClient.users.getUserList()

    const user = await clerkClient.users.updateUserMetadata(userId, { publicMetadata: { role } });
    res.status(200).json(user);
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await prismaClient.user.findMany();
    res.status(200).json(users);
}