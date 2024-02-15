import Employee from '../models/employee.ts';
import EmployeeRequest from '../models/employee.ts';

export const getAllEmployees = async () : Promise<Employee[]> => await Employee.findAll({order: [['id', 'ASC']]});

export const createEmployee = async (employee : EmployeeRequest) => {
    const {name, salary, department} = employee;
    const newEmployee = await Employee.create({name, salary, department:department.toUpperCase()});
    return newEmployee;
}

export const getEmployeeByID = async (id:number) : Promise<Employee | null> => {
    const employee = await Employee.findByPk(id);
    return employee;
}

export const updateEmployee = async (id:number,updates:EmployeeRequest): Promise<Employee[] | boolean> => {
    const {name, salary, department} = updates;
    const employee = await getEmployeeByID(id);

    if(!employee) throw new Error("Error!");
    const result = checkModification(employee,updates);
    if(result){
        const [updatedRow, updatedEmployee] = await Employee.update({name:name, salary:salary, department:department.toUpperCase()}, {where:{id},returning:true});
        return updatedEmployee;
    }
    
    return result; // false
}

export const deleteEmployee = async (id:number) => {
    const result = await Employee.destroy({ where: {id: id}});
    if (result>0) return true;
    else throw new Error('Error');
}

export const checkModification = (employee:Employee,updates:EmployeeRequest) :boolean => {
    if (employee.name === updates.name && employee.salary === updates.salary && employee.department == updates.department.toUpperCase()){ 
        return false;
    }
    return true;
}
