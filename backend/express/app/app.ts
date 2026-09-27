import { corsOptions } from '@constants/cors.options.js';
import { errorMiddleware } from '@middleware/error.middleware.js';
import assignmentRouter from '@routes/assignment.routes.js';
import authRouter from '@routes/auth.routes.js';
import locationRouter from '@routes/location.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'crypto';
import type { Application, NextFunction, Request, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { catchAsync } from 'zodex-axon/core';
import { BadRequest, globalErrorHandler } from 'zodex-axon/errors';
import { OkResponseStrategy } from 'zodex-axon/responses';

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

app.use("/api/geolocation", locationRouter);
app.use("/api/assignment", assignmentRouter);

// app.use("/api/auth", authRouter);

// app.use(globalErrorHandler);

app.use(errorMiddleware);

export { app };
