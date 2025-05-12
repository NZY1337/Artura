import express, { Express } from 'express';
import { createServer } from 'http';
import {  PORT } from './secrets';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
});

export const prismaClient = new PrismaClient({
    log: ["query"],
  }).$extends({
    result: {
    },
});

server.listen(PORT, () => console.log("App is working!"));

