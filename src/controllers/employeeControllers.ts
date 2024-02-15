import {Request, Response} from 'express';
import * as EmployeeServices from '../services/employeeServices';
import Employee, { ErrorResponse } from '../models/employee';

export const getAllEmployees = async (req:Request, res:Response) => {
    try {
        const employees = await EmployeeServices.getAllEmployees(); 
        res.status(200).json(employees);
    } catch(error){
        const e = error as Error
        const errorMessage : ErrorResponse =  { errorMessage: e.message };
        res.status(404).json(errorMessage);
    }
};

export const createEmployee = async (req:Request, res:Response) => {
    try{
        const newEmployee = await EmployeeServices.createEmployee(req.body);
        res.status(200).json(newEmployee);
    }catch(error) {
        const e = error as Error
        const errorMessage : ErrorResponse =  { errorMessage: e.message };
        res.status(404).json(errorMessage);
    }
    };

export const getEmployeeByID = async (req:Request, res:Response) => {
    try {
        const id = parseInt(req.params.emp_id,10);
        const employee = await EmployeeServices.getEmployeeByID(id);
        if(employee)
            res.status(200).json(employee);
        else {
            res.status(404).json({errorMessage:'Employee not found'});
        }
    } catch(error){
        const e = error as Error
        const errorMessage : ErrorResponse =  { errorMessage: e.message };
        res.status(500).json(errorMessage);
    }
};

export const updateEmployee = async (req:Request, res:Response) => {
    try {
        const id = parseInt(req.params.emp_id,10);
        const result = await EmployeeServices.updateEmployee(id,req.body);
        if (typeof result === 'boolean')
            res.status(200).json('No modification made!');   
        else 
            res.status(200).json(result);
    } catch(error) {
        const e = error as Error
        const errorMessage : ErrorResponse =  { errorMessage: e.message };
        res.status(404).json(errorMessage);
    }
};
    // if (!employee) {
    //      res.status(404).json({errorMessage: 'Employee not found'});
    //      return;
    // }

    // if (EmployeeServices.checkModification(employee,req.body))
    //     return res.status(304).json({errorMessage:"No Change"});
    

export const deleteEmployee = async (req:Request, res:Response) => {
    try{
        const id = parseInt(req.params.emp_id,10);
        await EmployeeServices.deleteEmployee(id);
        res.status(200).json({message:'Employee successfully deleted'});
    } catch(error){
        const e = error as Error
        const errorMessage : ErrorResponse =  { errorMessage: e.message };
        res.status(404).json(errorMessage);
    }
}


