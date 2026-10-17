import express, { Express, Request, Response } from "express";
import { HTTP_STATUS } from "./constants/httpStatus";
import morgan from "morgan";

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/health", (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

export default app;