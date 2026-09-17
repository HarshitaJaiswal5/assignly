import { corsOptions } from '@/constants/cors.options.js';
import { errorHandler } from '@/middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'crypto';
import type { Application, NextFunction, Request, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import  authRouter from '@/routes/auth.routes.js';

const app: Application = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use('/api/auth', authRouter);

app.use(errorHandler);

export { app };
