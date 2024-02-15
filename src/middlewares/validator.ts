import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { ErrorResponse } from "../models/employee";

export const validateRequest = (schema : Joi.Schema) => {
    return (req:Request, res:Response,next:NextFunction) => {
        const result = schema.validate(req.body);
        if (result.error){
            const errorMessage : ErrorResponse = { errorMessage : result.error.message };
            res.status(400).json(errorMessage);
            return;
        }
        next();
    }
}