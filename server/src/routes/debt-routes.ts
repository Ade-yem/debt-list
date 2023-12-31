import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import DebtController from "../controllers/DebtController.js";
import { validate, validateDebt } from "../utils/validators.js";

export const debtRoutes = Router()

debtRoutes.get("/name-list", verifyToken, DebtController.getNames)
debtRoutes.post("/list", verifyToken, DebtController.determineData)
debtRoutes.post("/add-card", verifyToken, validate(validateDebt), DebtController.createCard)
debtRoutes.put("/update-card", verifyToken, DebtController.updateCard)
debtRoutes.delete("/delete-card/:id", verifyToken, DebtController.deleteCard)
