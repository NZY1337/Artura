import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { CLERK_WEBHOOK_SIGNING_SECRET } from '../../../secrets'

const webhookSecret = CLERK_WEBHOOK_SIGNING_SECRET;

export const clerkWebhook = async (req: Request, res: Response) => {
    try {
        const wh = new Webhook(webhookSecret);

        // Extract and validate headers
        const svixId = req.headers["svix-id"];
        const svixTimestamp = req.headers["svix-timestamp"];
        const svixSignature = req.headers["svix-signature"];

        if (!svixId || !svixTimestamp || !svixSignature) {
            console.error("Error: Missing Svix headers");
            return res.status(400).json({ error: "Missing Svix headers" });
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
            return res.status(400).json({ error: "Verification error" });
        }

        // Handle specific event types
        if (evt.type === 'session.created') {
            console.log("Session created event received:", evt.data);
            // Add your business logic here
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};