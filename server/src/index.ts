import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./routes/index.js";
import {client, isAlive} from "./utils/redis.js";

config()

const app = express();
app.use(cors({origin: process.env.FRONTENDURL }))
app.use(express.json());
app.use(cookieParser(process.env.secretKey));

const db = process.env.mongoURI as string;

app.use("/api/v1", router);
console.log(`Redis client is alive: ${isAlive()}`)

mongoose
  .connect(db)
  .then(() => console.log("💻 Database Connected"))
  .catch(err => console.error(err));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Server working 🔥");
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));