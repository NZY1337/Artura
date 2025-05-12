import express, { Express } from 'express';
import { createServer } from 'http';
import { PORT, CLERK_WEBHOOK_SIGNING_SECRET } from './secrets';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './src/middlewares/errorMiddleware';
import { clerkWebhook } from './src/webhooks/clerk';

const app: Express = express();
const server = createServer(app);
const webhookSecret = CLERK_WEBHOOK_SIGNING_SECRET;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/webhook', express.raw({ type: 'application/json' }), clerkWebhook);

export const prismaClient = new PrismaClient({
    log: ["query"],
}).$extends({
    result: {
    },
});

app.use(errorMiddleware)
server.listen(PORT, () => console.log("App is working on port: " + PORT));

