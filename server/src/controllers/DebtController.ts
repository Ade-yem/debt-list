import { NextFunction, Request, Response } from "express";
import debtList from "../models/debt-list.js";
import mongoose from "mongoose";

export default class DebtController {
  static async getNames(req: Request, res: Response, next: NextFunction) {
    try {
      const debtors = await debtList.find();
      if (!debtors) return res.status(400).json({message: "Unable to get list"})
      const list = [];
      for await (const debtor of debtors) {
        list.push(debtor.name)
      }
      return res.status(200).json({message: 'OK', list})
    } catch (error) {
      console.log(error)
      res.status(400).json({message: "Error", cause: error})
    }
  }
  static async getListByName(req: Request, res: Response, next: NextFunction) {
      try {
        const { name } = req?.params;
        const debtorsList = await debtList.find({name});
        if (!debtorsList) return res.status(400).json({message: "Unable to get list"})
        return res.status(200).json({message: 'OK', debtorsList})
      } catch (error) {
        console.log(error)
        res.status(400).json({message: "Error", cause: error})
      }
  }
  static async getListByDate(req: Request, res: Response, next: NextFunction) {
      try {
        const { date } = req?.params;
        const debtorsList = await debtList.find({date});
        if (!debtorsList) return res.status(401).json({message: "Unable to get list"})
        return res.status(200).json({message: 'OK', debtorsList})
      } catch (error) {
        console.log(error)
      res.status(400).json({message: "Error", cause: error})
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
        const { name, date, amount, amount_paid, paid, id, written_by, comment } = req?.body;
        await debtList.findByIdAndUpdate(id, { name, date, amount, amount_paid, paid, written_by, comment }, (err: any, result: any) => {
          if (err) return res.status(401).json({message: "Unable to update card"})
          return res.status(201).json({message: "successful", card: result})
        })
      } catch (error) {
        console.log(error)
      res.status(400).json({message: "Error", cause: error})
      }
  }
  static async deleteCard(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req?.params;
        await debtList.findByIdAndDelete(id)
        return res.status(201).json({message: 'OK'})
      } catch (error) {
        console.log(error)
        res.status(400).json({message: "Error", cause: error})
      }
  }

}