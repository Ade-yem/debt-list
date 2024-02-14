import { NextFunction, Request, Response } from "express";
import User  from "../models/user.js"
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { config } from "dotenv";
import { setKey, deleteKey } from "../utils/redis.js";

config()

const duration = 60 * 60 * 24 * 10
export default class AuthController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try{
      const { name, username, password } = req.body;
      // find if user exists
      const user = await User.findOne({username})
      if (user) return res.status(401).json({error: "User already exist"})
      const phash = await hash(password, 10);
      const newUser = new User({ name, username, password: phash });
      await newUser.save();
      const token = createToken(newUser._id.toString(), username, "10d");
      const user_string = JSON.stringify({id: newUser._id.toString(), username: username})
      await setKey(newUser._id.toString(), user_string, duration)
      return res.status(201).json({message: "User signup successfull", username, token})
    } catch (error) {
      console.error(error)
      res.status(400).json({message: "Error", cause: error})
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      // find if user exists
      const user = await User.findOne({username})
      if (!user) return res.status(401).json({error: "Invalid username"})
      const comp = await compare(password, user.password)
      if (!comp) return res.status(401).json({error: "Invalid password"})
      const token = createToken(user._id.toString(), username, "10d");
      const session_user = JSON.stringify({id: user._id.toString(), username: username})
      await setKey(user._id.toString(), session_user, duration)
      return res.status(200).json({message: "User signin successfull", username, token})
    } catch (error) {
      console.error(error)
      res.status(400).json({error})
    }
  }
  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      // find if user exists
      const user = await User.findOne({username})
      if (!user) return res.status(401).json({error: "Invalid username"})
      const phash = await hash(password, 10);
      user.password = phash;
      await user.save();
      return res.status(201).json({message: "Password change successful"})
    } catch (error) {
      console.error(error)
      res.status(400).json({error})
    }
  }

  static async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(res.locals.user.id);
      if (!user) return res.status(401).json({error: "User does not exist or invalid token"});
        await deleteKey(res.locals.user.id)
        return res.status(201).json({message: 'User logged out successfully'})
      } catch (error) {
        console.error(error)
      res.status(400).json({error})
      }
  }

  static async checkUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(res.locals.user.id);
      if (!user) return res.status(401).json({message: "User does not exist or invalid token"});
      return res.status(200).json({message: 'User logged in successfully', username: user.username})
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: "Error", cause: error});
    }
  }
}
