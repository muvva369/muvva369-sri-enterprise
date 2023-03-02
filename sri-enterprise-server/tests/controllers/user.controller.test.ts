import { expect } from "chai";
import { Response, Request } from "express";
import { describe, it } from "mocha";
import { UserController } from "../../src/controllers/user.controller";

describe("UserController", () => {
  it("should validate requirement", () => {
    const req = {
      body: {
        selectedApparels: [
          { code: "AP01", size: "M", quantity: 2 },
          { code: "AP90", size: "s", quantity: 1 },
        ],
      },
    } as Request;
    const res = {
      status: (code: number) => ({
        json: (data: { message: string }) => {
          expect(code).to.equal(201);
          expect(data.message).to.equal(
            "1 Apparels can be fullfilled in selected 2 Aopparels "
          );
        },
      }),
    } as unknown as Response;
    const next = () => {};

    UserController.validateRequirement(req, res, next);
  });

  describe("UserController", () => {
    it("should give error message when given no apparels", () => {
      const req = {} as Request;
      const res = {
        status: (code: number) => ({
          json: (data: { message: string }) => {
            expect(code).to.equal(500);
            expect(data.message).to.equal("No Apparels provided");
          },
        }),
      } as unknown as Response;
      const next = () => {};

      UserController.validateRequirement(req, res, next);
    });
  });

  describe("UserController", () => {
    it("should give minimal price for given requirement", () => {
      const req = {
        body: {
          selectedApparels: [
            { code: "AP01", size: "M", quantity: 2 },
            { code: "AP02", size: "s", quantity: 1 },
          ],
        },
      } as Request;
      const res = {
        status: (code: number) => ({
          json: (data: any) => {
            expect(code).to.equal(201);
            expect(data["Miminal Order Price"]).to.equal(797);
          },
        }),
      } as unknown as Response;
      const next = () => {};

      UserController.validateRequirement(req, res, next);
    });
  });
});
