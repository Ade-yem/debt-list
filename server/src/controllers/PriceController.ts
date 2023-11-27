import { NextFunction, Request, Response } from "express";
import priceList from "../models/price-list.js";

export default class PriceController {
  static async createPrice(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, variation, bulk_price, unit_price } = req.body;
      const newPrice = new priceList({ name, variation, bulk_price, unit_price })
      await newPrice.save()
      return res.status(200).json({message: 'OK', price: newPrice})
    } catch (error) {
      console.log(error)
      res.status(400).json({message: "Error", cause: error})
    }

  }
  static async updatePrice(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, variation, bulk_price, unit_price, _id } = req?.body;
      // console.log(req.body)
      const result = await priceList.findByIdAndUpdate(_id, { name, variation, bulk_price, unit_price }, { new: true });
      if (!result) {
        return res.status(404).json({ message: "Price not found" });
      }
  
      return res.status(201).json({ message: "successful", price: result });
    } catch (error) {
      console.log(error);
      //@ts-ignore
      res.status(500).json({ message: "Error", cause: error.message });
    }
    
  }
  static async getPriceList(req: Request, res: Response, next: NextFunction) {
    try {
      const pList = await priceList.find();
      if (!pList) return res.status(400).json({message: "Unable to get list"})
      return res.status(200).json({message: 'OK', pList})
    } catch (error) {
      console.log(error)
      res.status(400).json({message: "Error", cause: error})
    }
  }
  static async deletePrice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req?.params;
      await priceList.findByIdAndDelete(id)
      return res.status(201).json({message: 'OK'})
    } catch (error) {
      console.log(error)
      //@ts-expect-error
      res.status(400).json({message: "Error", cause: error.message})
    }
  }  
}