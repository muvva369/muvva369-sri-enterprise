import { NextFunction, Request, Response } from "express";
import { Apparels } from "../data/apparels.data";
import { Apparel } from "../models/apparel.model";
import CustomError from "./customError.controller";

export class VendorController {
  private static validateApparelCodeSize(
    vendorID: number,
    code: string,
    size: string
  ) {
    return Apparels.findIndex(
      (a: Apparel) =>
        a.vendor === vendorID &&
        a.code.toLowerCase() === code.toLowerCase() &&
        a.size.includes(size.toUpperCase())
    );
  }

  private static updateApparel = (
    vendorID: number,
    code: string,
    size: string,
    updatedQuantity: number,
    updatedPrice: number
  ) => {
    try {
      if(!vendorID) throw new CustomError( "No Apparels provided",500);
      let apparelIndex = this.validateApparelCodeSize(vendorID, code, size);
      if (apparelIndex !== -1) {
        let attributeIndex = Apparels[apparelIndex].attributes.findIndex(
          (s) => s.size === size.toUpperCase()
        );
        Apparels[apparelIndex].attributes[attributeIndex] = {
          ...Apparels[apparelIndex].attributes[attributeIndex],
          price: updatedPrice,
          quantity: updatedQuantity,
        };
        return {
          ...Apparels[apparelIndex],
          successMessage: "Updated Quantity and Price successfully",
        };
      } else {
        throw new CustomError("No Apparel exists with given Inputs",500);
      }
    } catch (err) {
      // console.log(err);
      return err
    }
  };

  public static updateOneApparel = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { vendorID, code, size, updatedQuantity, updatedPrice } = req.body;
      let result = this.updateApparel(
        vendorID,
        code,
        size,
        updatedQuantity,
        updatedPrice
      );
      if (result!.hasOwnProperty('successMessage')) res.status(201).send(result);
      else throw result
    } catch (error) {
      next(error);
    }
  };

  public static updateMultipleApparels = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let selectedApparels = req.body,
        updatedApparels: number = 0;
      if (selectedApparels.length == 0){
          throw new CustomError( "No Apparels provided",500);
      }
      selectedApparels.forEach((element: any) => {
        let update = this.updateApparel(
          element.vendorID,
          element.code,
          element.size,
          element.updatedQuantity,
          element.updatedPrice
        );
        if (update!.hasOwnProperty('successMessage')) updatedApparels++;
      });
      if (updatedApparels > 0){
          res.status(201).send({
            successMessage: `updated ${updatedApparels} Apparels price and quantity`,
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
