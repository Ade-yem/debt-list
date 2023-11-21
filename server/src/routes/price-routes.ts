import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import PriceController from "../controllers/PriceController.js";

export const priceRoutes = Router()
priceRoutes.get("/price-list", verifyToken, PriceController.getPriceList)
priceRoutes.post("/price-list", verifyToken, PriceController.createPrice)
priceRoutes.put("/price-list", verifyToken, PriceController.updatePrice)
priceRoutes.delete("/price-list/:id", verifyToken, PriceController.deletePrice)