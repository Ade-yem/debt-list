import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoDBStore from 'connect-mongodb-session';
import { router } from "./routes/index.js";

config()

const app = express();
app.use(cors({origin: process.env.FRONTENDURL, credentials: true }))
app.use(express.json());
app.use(cookieParser(process.env.secretKey));

const db = process.env.mongoURI as string;
const store = new (MongoDBStore(session))({
  uri: db,
  collection: 'sessions',
});

app.use(session({
  secret: process.env.secretKey as string,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: true,
    sameSite: "none",
    // domain: process.env.DOMAIN,
    path: "/",
    maxAge: 60 * 60 * 24 * 10 * 1000,
    signed: true,
    httpOnly: true
  }
}))
app.use("/api/v1", router);

store.on('error', (error: any) => {
  console.error(error);
});
mongoose
  .connect(db)
  .then(() => console.log("💻 Database Connected"))
  .catch(err => console.error(err));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Server working 🔥");
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));