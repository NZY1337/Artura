import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { CLERK_WEBHOOK_SIGNING_SECRET } from '../../../secrets'
import { BadRequestException, InternalException, ErrorCode } from '../../middlewares/errorMiddleware';
import { prismaClient } from '../../utils/prismaClient';

// Session created event received: {
//   abandon_at: 3894550325985,
//   actor: null,
//   client_id: 'client_2vqtaYe0RxROs8Lo9QjhBSIm3Cm',
//   created_at: 1747066678985,
//   expire_at: 3894550325985,
//   id: 'sess_2x0EdckrPcQ5szoshSsz4huKhfs',
//   last_active_at: 1747066678985,
//   object: 'session',
//   status: 'active',
//   updated_at: 1747066679028,
//   user_id: 'user_2vqtdU0El5DW5rI4CyjYSxdQwNF'
// }

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

        // model User {
        //     id        String @id @default (uuid())
        //     name      String
        //     email     String @unique
        //     password  String
        //     role      Role @default (USER)
        //     createdAt DateTime @default (now())
        //     updatedAt DateTime @updatedAt
        // }

        // id: 'idn_2x0IPK36q0hHclUpK2rCDDQWNZR',
        // 'user_2x0KddgiAQEk0xB6ksPOvs2qj7p

        try {
            // Handle specific event types
            if (evt.type === 'user.created') {
                const { id, email_addresses, username, role, created_at, updated_at } = evt.data;
                const user = {
                    id,
                    email: email_addresses[0].email_address,
                    username: username || null,
                    role: role || "MEMBER",
                    createdAt: new Date(created_at),
                    updatedAt: new Date(updated_at),
                };

                await prismaClient.user.upsert({
                    where: { id },
                    update: {},
                    create: {
                        ...user
                    }
                })
            }

            console.log("Ev Data:", evt.data,);
            console.log("Ev Type:", evt.type);
        } catch (error) {
            console.error("Error: Could not handle webhook event:", error);
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Error verifying webhook:', err);
        // return res.status(500).json({ error: 'Internal server error' });
        throw new InternalException(ErrorCode.INTERNAL_EXCEPTION, "Internal server error");
    }
};