import express from 'express';
import * as EmployeeController from "../controllers/employeeControllers";
import { validateRequest } from '../middlewares/validator';
import * as Joi from 'joi';

const router = express.Router();

const employeeRequestSchema = Joi.object({
    name: Joi.string().required(),
    salary: Joi.number().strict(true).integer().required(),
    department: Joi.string().uppercase().valid('HR', 'PS').required(),
});


router.get(`/employee`,EmployeeController.getAllEmployees);
router.post('/employee',[validateRequest(employeeRequestSchema),EmployeeController.createEmployee]);
router.get('/employee/:emp_id',EmployeeController.getEmployeeByID);
router.put('/employee/:emp_id', [validateRequest(employeeRequestSchema),EmployeeController.updateEmployee]);
router.delete('/employee/:emp_id',EmployeeController.deleteEmployee);

export default router;
