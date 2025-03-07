import express from "express";
import config from "./config";
import router from "./routes/index.routes";
import { genericErrorHandler, routeNotFoundError } from "./middlewares/errorHandler.middleware";
import { requestLogger } from "./middlewares/logger.middleware";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors"

const app = express();

const limiter = rateLimiter({
    windowMs: 60 * 1000,
    limit: 10,
    message: "Too many request",
})

app.use(helmet());

app.use(limiter);

const allowedOrigins = ["http://www.test.com"]

app.use(
    cors({
        origin: (origin, callback) => {
            if(!origin || allowedOrigins.includes(origin)) {
                callback(null, origin);
            } else {
                callback( new Error("Not Allowed"));
            }
        }
}));

app.use(express.json());  
app.use(express.json());  

app.use(requestLogger);
app.use(router);

app.use(genericErrorHandler);
app.use(routeNotFoundError);

app.listen(config.port, () => {
    console.log(`Server started listening on port: ${config.port}`);
});