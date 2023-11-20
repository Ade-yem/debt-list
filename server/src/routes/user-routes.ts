import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { validate, validateLogin, validateSignup } from "../utils/validators.js"

export const userRoutes = Router()
userRoutes.post("/login", validate(validateLogin), AuthController.loginUser)
userRoutes.post("/register", validate(validateSignup), AuthController.createUser)
userRoutes.post("/logout", AuthController.logoutUser)
userRoutes.get("/status", AuthController.checkUserStatus)