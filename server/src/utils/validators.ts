import { ValidationChain, body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validateLogin = [
  body("username").trim().notEmpty().withMessage({message: "Username is empty"}),
  body("password").trim().isLength({min: 8}).withMessage({message: "Password must be at least eight characters"})
]
export const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage({message: "Name is empty"}),
]
export const validateDebt = [
  body("name").trim().notEmpty().withMessage({message: "Name is empty"}),
  body("date").trim().matches(/^\d{2}\/\d{2}\/\d{4}$/).withMessage({message: 'Invalid date format. Use DD/MM/YYYY' }),,
  body('amount').trim().isNumeric().withMessage({ message: 'Amount must be a number' })
    .custom((value) => {
      const amount = parseFloat(value);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Amount must be greater than zero');
      }
      return true;
    }),
  body("paid").isBoolean().withMessage({message: "Must be boolean"}),
  body("written_by").trim().notEmpty().withMessage({message: "Name is empty"}),
]

export const validate = (validations: ValidationChain[]) => {
  return async (req:Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req)
      if (!result.isEmpty()) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(422).json({errors: errors.array()})
  }
}
