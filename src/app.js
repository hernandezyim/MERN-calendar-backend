import express, { static as statics, json, urlencoded } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import dbConnection from "./database/configs/database-config.js";
import authRouter from "./routers/authRouter.js";
import eventsRouter from "./routers/eventsRouter.js";

import "dotenv/config";

const app = express();

dbConnection();

app.set("port", process.env.PORT || 4000);

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(statics("public"));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use("/api/v_1/auth", authRouter);
app.use("/api/v_1/events", eventsRouter);

export default app;
