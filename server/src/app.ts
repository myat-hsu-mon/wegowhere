import express, { Application } from "express";
const cors = require("cors");

import { connectDB } from "./database";
import { listenServer } from "./server";

import { authRouter } from "./routes/auth.route";
import { usersRouter } from "./routes/users.route";
import { cardsRouter } from "./routes/cards.route";

import { protect } from "./middlewares/protect";

//serve the Application and connect Database
const app: Application = express();
listenServer(app);
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", protect, usersRouter);
app.use("/api/v1/cards", protect, cardsRouter);
