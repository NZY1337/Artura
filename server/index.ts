import express, { Express } from 'express';
import { createServer, get } from 'http';
import { PORT, CLERK_WEBHOOK_SIGNING_SECRET } from './secrets';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { BadRequestException, errorMiddleware } from './src/middlewares/errorMiddleware';
import { clerkWebhook } from './src/webhooks/clerk';
import { clerkClient, requireAuth, getAuth, clerkMiddleware } from '@clerk/express'
import rootRouter from './src/routes';


const app: Express = express();
const server = createServer(app);

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware())

app.get('/', (req, res) => {
    if (!req.auth.userId) {
        // User is not authenticated        
        // throw new BadRequestException(400, "Bad Request");}
        return res.status(400).json({ error: "Bad Request" });
    }
    res.send('Hello World!');
});

app.use("/api", rootRouter);

app.post('/webhook', express.raw({ type: 'application/json' }), clerkWebhook);

app.use(errorMiddleware)
server.listen(PORT, () => console.log("App is working on port: " + PORT));

