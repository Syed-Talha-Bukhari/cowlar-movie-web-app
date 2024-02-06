import express, { NextFunction } from "express";
import { IRequest, IResponse } from "./types/express";
import morgan from "morgan";
import cors from "cors";

// ROUTES
import { authRouter } from "./routes/auth";
import { movieRouter } from "./routes/movie";

// CONTROLLERS
import { errorController } from "./controllers/error";

// UTILITIES
import { AppError } from "./utils/appError";

// MIDDLEWARES
const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use((req: IRequest, res: IResponse, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

// API routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movies', movieRouter);

app.get("/", (req: IRequest, res: IResponse) => {
  res.send("Hello from the server!");
});

// Manage unhandled routes
app.all("*", (req: IRequest, res: IResponse, next: NextFunction) => {
  const err = new AppError(`Unable to find ${req.originalUrl} on server`, 404);
  next(err);
});

// Global error handler
app.use(errorController);

export default app;
