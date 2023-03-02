import { expect } from "chai";
import { Response, Request } from "express";
import { describe, it } from "mocha";
import { VendorController } from "../../src/controllers/vendor.controller";

describe("VendorController", () => {
  it("should update-one-apparel", () => {
    const req = {
      body: {
        vendorID: 2,
        code: "AP01",
        size: "S",
        updatedQuantity: 200,
        updatedPrice: 219,
      },
    } as Request;
    const res = {
      status: (code: number) => ({
        json: (data: any) => {
          expect(code).to.equal(201);
          expect(data).to.contain("ID");
        },
      }),
    } as unknown as Response;
    const next = () => {};

    VendorController.updateOneApparel(req, res, next);
  });

  describe("VendorController", () => {
    it("should give error message when given no apparels", () => {
      const req = {} as Request;
      const res = {
        status: (code: number) => ({
          json: (data: { message: string }) => {
            expect(data.message).to.equal("No Apparels provided");
          },
        }),
      } as unknown as Response;
      const next = () => {};

      VendorController.updateOneApparel(req, res, next);
    });
  });

  describe("VendorController", () => {
    it("should give error message when apparel doesn't exist", () => {
      const req = {
        body: {
          vendorID: 2,
          code: "AP90",
          size: "S",
          updatedQuantity: 200,
          updatedPrice: 219,
        },
      } as Request;
      const res = {
        status: (code: number) => ({
          json: (data: { message: string }) => {
            expect(data.message).to.equal(
              "No Apparel exists with given Inputs"
            );
          },
        }),
      } as unknown as Response;
      const next = () => {};

      VendorController.updateOneApparel(req, res, next);
    });
  });

  describe("VendorController", () => {
    it("should update multiple apparels", () => {
      const req = {
        body: [
          {
            vendorID: 2,
            code: "AP0",
            size: "S",
            updatedQuantity: 200,
            updatedPrice: 19,
          },
          {
            vendorID: 3,
            code: "AP01",
            size: "M",
            updatedQuantity: 200,
            updatedPrice: 219,
          },
        ],
      } as Request;
      const res = {
        status: (code: number) => ({
          json: (data: any) => {
            expect(code).to.equal(201);
            expect(data.successMessage).to.equal("updated 1 Apparels price and quantity");
          },
        }),
      } as unknown as Response;
      const next = () => {};

        VendorController.updateMultipleApparels(req, res, next);
    });
  });
});
