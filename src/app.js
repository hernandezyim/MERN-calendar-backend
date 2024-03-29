import express from "express";
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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use("/api/v_1/auth", authRouter);
app.use("/api/v_1/events", eventsRouter);

export default app;
