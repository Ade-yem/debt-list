import { NextFunction, Request, Response } from "express";
import User  from "../models/user.js"
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";

const cookieName = "auth_token";

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
      res.clearCookie(cookieName)
      const token = createToken(newUser._id.toString(), username, "10d");
      res.cookie(cookieName, token)
      return res.status(201).json({message: "User signup successfull", username})
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
      res.clearCookie(cookieName)
      const token = createToken(user._id.toString(), username, "10d");
      res.cookie(cookieName, token)
      return res.status(200).json({message: "User signin successfull", username})
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
      return res.status(201).json({message: "Password change successfull"})
    } catch (error) {
      console.error(error)
      res.status(400).json({error})
    }
  }

  static async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) return res.status(401).json({error: "User does not exist or invalid token"});
        res.clearCookie(cookieName)
        return res.status(201).json({message: 'User logged out successfully'})
      } catch (error) {
        console.error(error)
      res.status(400).json({error})
      }
  }

  static async checkUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) return res.status(401).json({message: "User does not exist or invalid token"});
      return res.status(200).json({message: 'User logged in successfully', username: user.username})
    } catch (error) {
      console.log(error);
      res.status(400).json({message: "Error", cause: error});
    }
  }
}
