import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { validate, validateLogin, validateSignup } from "../utils/validators.js"
import { verifyToken } from "../utils/token-manager.js";

export const userRoutes = Router()
userRoutes.post("/login", validate(validateLogin), AuthController.loginUser)
userRoutes.post("/register", validate(validateSignup), AuthController.createUser)
userRoutes.post("/forgot", validate(validateLogin), AuthController.forgotPassword)
userRoutes.post("/logout", AuthController.logoutUser)
userRoutes.get("/status", verifyToken, AuthController.checkUserStatus)
