import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {config} from "dotenv";
import { getKey } from "./redis.js";
config()

const secret = process.env.secretKey as string
type User = {
  id: string;
  username: string;
}

export const createToken = (id: string, username: string, expiresIn: string) => {
  const payload = {id, username};
  const token = jwt.sign(payload, secret, {expiresIn});
  return token;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")
  if (!token || token.trim() === "") return res.status(401).json({error: "Invalid token"});
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, secret, async (err: any, success: any) => {
      if (err) {
        // check
        reject(err);
        return res.status(401).json({error: " Wrong token or Unable to verify token"})
      } else {
        resolve();
        let user: User;
        const user_string = await getKey(success.id)
        //@ts-ignore
        user = JSON.parse(user_string)
        if (user && user?.id === success.id && user?.username === success.username){
          res.locals.user = success;
          return next();
        }
        else return res.status(401).json({error: "Unable to verify token"})
        
      }
    })
  })
}