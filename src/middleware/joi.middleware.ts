import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = { ...req.body };
      await schema.validateAsync(dataToValidate);
      next();
    } catch (error: Error | any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: error.message,
      });
    }
  };
};
