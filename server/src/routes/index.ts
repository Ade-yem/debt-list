import { Router } from "express";
import { userRoutes } from "./user-routes.js";
import { debtRoutes } from "./debt-routes.js";
import { priceRoutes } from "./price-routes.js";

export const router = Router();
router.use("/user", userRoutes)
router.use("/debt", debtRoutes)
router.use("/price", priceRoutes)