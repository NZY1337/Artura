import express, { Express } from 'express';
import { createServer } from 'http';
import { PORT, CLERK_WEBHOOK_SIGNING_SECRET } from './secrets';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { BadRequestException, errorMiddleware } from './src/middlewares/errorMiddleware';
import { clerkWebhook } from './src/webhooks/clerk';

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

app.get('/', (req, res) => {
    res.send('Hello World!');
    // throw new BadRequestException(400, "Bad Request");
});

app.post('/webhook', express.raw({ type: 'application/json' }), clerkWebhook);

app.use(errorMiddleware)
server.listen(PORT, () => console.log("App is working on port: " + PORT));

