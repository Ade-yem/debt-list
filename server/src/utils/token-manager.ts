import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {config} from "dotenv"
config()

const cookieName = "auth_token";
const secret = process.env.secretKey as string

export const createToken = (id: string, username: string, expiresIn: string) => {
  const payload = {id, username};
  const token = jwt.sign(payload, secret, {expiresIn});
  return token;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies[`${cookieName}`];
  if (!token || token.trim() === "") return res.status(401).json({error: "Invalid token"});
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, secret, (err: any, success: any) => {
      if (err) {
        reject(err);
        return res.status(401).json({error: "Unable to verify token"})
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    })
  })
}