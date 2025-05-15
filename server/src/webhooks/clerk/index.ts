import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { CLERK_WEBHOOK_SIGNING_SECRET } from '../../../secrets'
import { BadRequestException, InternalException, ErrorCode } from '../../middlewares/errorMiddleware';
import { prismaClient, } from '../../utils/prismaClient';
import { Role } from '@prisma/client';
import { clerkClient } from "@clerk/express";

export const clerkWebhook = async (req: Request, res: Response) => {
    try {
        const wh = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET);

        const svixId = req.headers["svix-id"];
        const svixTimestamp = req.headers["svix-timestamp"];
        const svixSignature = req.headers["svix-signature"];

        if (!svixId || !svixTimestamp || !svixSignature) {
            console.error("Error: Missing Svix headers");
            throw new BadRequestException(ErrorCode.BAD_REQUEST, "Missing Svix headers");
        }

        const headers = {
            "svix-id": svixId as string,
            "svix-timestamp": svixTimestamp as string,
            "svix-signature": svixSignature as string,
        };

        const payload = req.body;
        const body = JSON.stringify(payload);
        let evt: any;

        // Verify payload with headers
        try {
            evt = wh.verify(body, headers);
        } catch (err) {
            console.error("Error: Could not verify webhook:", err);
            throw new BadRequestException(ErrorCode.BAD_REQUEST, "Verification error");
        }

        try {
            // Handle specific event types
            if (evt.type === 'user.created') {
                const { id, email_addresses, username, role, created_at, updated_at } = evt.data;

                await clerkClient.users.updateUserMetadata(id, { publicMetadata: { role: 'user' } });
                const user = {
                    id,
                    email: email_addresses[0].email_address,
                    username: username || null,
                    role: Role.user,
                    createdAt: new Date(created_at),
                    updatedAt: new Date(updated_at),
                };

                console.log('hoook griggered ---------', user)

                await prismaClient.user.create({
                    data: { ...user }
                })
            }

            if (evt.type === 'user.updated') {
                const { id, email_addresses, username, role, created_at, updated_at, public_metadata } = evt.data;

                const user = {
                    id,
                    email: email_addresses[0].email_address,
                    username: username || null,
                    role: public_metadata.role || Role.user,
                    createdAt: new Date(created_at),
                    updatedAt: new Date(updated_at),
                };

                console.log(user);
                await prismaClient.user.update({
                    where: { id: user.id },
                    data: { ...user }
                })
            }

            if (evt.type === 'user.deleted') {
                const { id } = evt.data;
                console.log('---user-deleted');
                await prismaClient.user.delete({
                    where: { id }
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Error verifying webhook:', err);
        // return res.status(500).json({ error: 'Internal server error' });
        throw new InternalException(ErrorCode.INTERNAL_EXCEPTION, "Internal server error");
    }
};