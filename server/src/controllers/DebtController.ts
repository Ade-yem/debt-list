import { NextFunction, Request, Response } from "express";
import debtList from "../models/debt-list.js";
import { ObjectId } from "mongodb";

export default class DebtController {
  static async getNames(req: Request, res: Response, next: NextFunction) {
    try {
      const debtors = await debtList.find();
      if (!debtors) return res.status(400).json({message: "Unable to get list"})
      
      const uniqueNames = new Set()
      for await (const debtor of debtors) {
        uniqueNames.add(debtor.name)
      }
      const list = Array.from(uniqueNames)
      return res.status(200).json({message: 'OK', list})
    } catch (error) {
      console.log(error)
      res.status(400).json({message: "Error", cause: error})
    }
  }
  
  static async getListByName(req: Request, res: Response, next: NextFunction) {
      try {
        const { data } = req?.body;
        const debtorsList = await debtList.find({name: data});
        if (!debtorsList) return res.status(400).json({message: "Unable to get list"})
        return res.status(200).json({message: 'OK', debtorsList})
      } catch (error) {
        console.log(error)
        res.status(400).json({message: "Error", cause: error})
      }
  }
  static async getListByDate(req: Request, res: Response, next: NextFunction) {
      try {
        const { data } = req?.body;
        const debtorsList = await debtList.find({date: data});
        if (!debtorsList) return res.status(401).json({message: "Unable to get list"})
        return res.status(200).json({message: 'OK', debtorsList})
      } catch (error) {
        console.log(error)
      res.status(400).json({message: "Error", cause: error})
      }
  }
  static async determineData(req: Request, res: Response, next: NextFunction) {
    const data = req.body.data; // Assuming the data is in the request body
    // Check if the data is a valid date string
    const isDate = /^\d{2}\/\d{2}\/\d{4}$/.test(data);
  
    // Redirect to the appropriate controller function
    if (isDate) { 
      await DebtController.getListByDate(req, res, next);
    } else {
      await DebtController.getListByName(req, res, next);
    }
  }
  static async createCard(req: Request, res: Response, next: NextFunction) {
      try {
        const { name, date, amount, amount_paid, paid, written_by, comment } = req?.body;
        const newCard = new debtList({
          name, date, amount, amount_paid, paid, written_by, comment
        })
        await newCard.save()
        return res.status(200).json({message: 'OK', card: newCard})
      } catch (error) {
        console.log(error)
      res.status(400).json({message: "Error", cause: error})
      }
  }
  static async updateCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, date, amount, amount_paid, paid, _id, written_by, comment } = req?.body;
      // console.log(req.body)
      const result = await debtList.findByIdAndUpdate(_id, { name, date, amount, amount_paid, paid, written_by, comment }, { new: true });
      if (!result) {
        return res.status(404).json({ message: "Card not found" });
      }
  
      return res.status(201).json({ message: "successful", card: result });
    } catch (error) {
      console.log(error);
      //@ts-ignore
      res.status(500).json({ message: "Error", cause: error.message });
    }
  }
  
  static async deleteCard(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req?.params;
        await debtList.findByIdAndDelete(id)
        return res.status(201).json({message: 'OK'})
      } catch (error) {
        console.log(error)
        //@ts-expect-error
        res.status(400).json({message: "Error", cause: error.message})
      }
  }

}