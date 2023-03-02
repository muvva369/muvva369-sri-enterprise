import { NextFunction, Request, Response } from "express";
import { Apparels } from "../data/apparels.data";
import CustomError from "./customError.controller";

export class UserController {
  private static checkApparelAvailability = (
    code: string,
    size: string,
    quantity: number
  ) => {
    let filteredApparels: {
      ID: number;
      code: string;
      size: string;
      quantity: number;
      price: number;
    }[] = [];
    Apparels.map((a) => {
      let sizeIndex: number = a.attributes.findIndex(
        (e) => e.size === size && e.quantity >= quantity
      );
      if (a.code === code && sizeIndex !== -1)
        filteredApparels.push({
          ID: a.ID,
          code: a.code,
          size,
          quantity,
          price: a.attributes[sizeIndex].price,
        });
    });
    if (filteredApparels.length > 0) {
      filteredApparels.sort((a, b) => a.price - b.price);
    }
    return filteredApparels;
  };

  public static validateRequirement = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { selectedApparels } = req.body,
        result: { code: string; canBeFullfilled: boolean }[] = [];
      if (!selectedApparels || selectedApparels.length === 0) {
        throw new CustomError("No Apparels provided",500);
      } else {
        selectedApparels.forEach((element: any) => {
          if (
            this.checkApparelAvailability(
              element.code.toUpperCase(),
              element.size.toUpperCase(),
              element.quantity
            ).length > 0
          ) {
            result.push({
              code: element.code.toUpperCase(),
              canBeFullfilled: true,
            });
          } else {
            result.push({
              code: element.code.toUpperCase(),
              canBeFullfilled: false,
            });
          }
        });
        let count = result.reduce(
          (count, { canBeFullfilled }) => count + (canBeFullfilled ? 1 : 0),
          0
        );
        res.status(201).send({
          message: `${count} Apparels can be fullfilled in selected ${selectedApparels.length} Aopparels `,
          result,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  public static getMinimalPrice = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { selectedApparels } = req.body;
      if (!selectedApparels || selectedApparels.length === 0) {
        throw new CustomError("No Apparels provided",500);
      }else{
        let result:{
          ID: number;
          code: string;
          size: string;
          quantity: number;
          price: number;
        }[]=[]
        selectedApparels.forEach((element: any) => {
            let filteredApparels:any =this.checkApparelAvailability(
              element.code.toUpperCase(),
              element.size.toUpperCase(),
              element.quantity
            )
            if(filteredApparels.length>0) result.push(filteredApparels[0])
        })
        let finalPrice = result.reduce(((fp,{price,quantity})=>(fp+(price*quantity))),0)
        res.status(201).send({
          "Miminal Order Price":finalPrice,
          "Order details":result
        })
      }
    } catch (error) {
      next(error);
    }
  };
}
