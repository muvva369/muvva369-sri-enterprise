import { expect } from 'chai';
import { Response ,Request} from 'express';
import { describe, it } from 'mocha';
import { errorHandler } from '../src/errorHandler';
import CustomError from '../src/controllers/customError.controller'

describe('errorHandler', () => {
  it('should return an error response with the status code and message from the error instance', () => {
    const error = new CustomError('Something went wrong', 500);
    const req = {} as Request;
    const res = {
      status: (code: number) => ({
        json: (data: { message: string }) => {
          expect(code).to.equal(500);
          expect(data.message).to.equal('Something went wrong');
        },
      }),
    } as unknown as Response;
    const next = () => {};

    errorHandler(error, req, res, next);
  });

  it('should return a generic error response with a 500 status code for other types of errors', () => {
    const error = new Error('Something broke!');
    const req = {} as Request;
    const res = {
      status: (code: number) => ({
        json: (data: { message: string }) => {
          expect(code).to.equal(500);
          expect(data.message).to.equal('Something broke!');
        },
      }),
    } as unknown as Response;
    const next = () => {};

    errorHandler(error, req, res, next);
  });
});
