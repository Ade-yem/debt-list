import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./routes/index.js";

config()

const app = express();
app.use(cors({origin: process.env.FRONTENDURL, credentials: true }))
app.use(express.json());
app.use(cookieParser(process.env.secretKey))
app.use("/api/v1", router);
const db = process.env.mongoURI as string;

mongoose
  .connect(db)
  .then(() => console.log("💻 Database Connected"))
  .catch(err => console.error(err));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Server working 🔥");
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));