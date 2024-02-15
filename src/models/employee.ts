'use strict';
import { Model, DataTypes } from "sequelize";
import sequelize from '../config/database'


  export interface ErrorResponse {
    errorMessage : string;
  }
  export class EmployeeRequest extends Model {
    public name!:String;
    public salary!: number;
    public department!: String;

    //maybe need timestamps etc?
    // public readonly createdAt! : Date;
    // public readonly updatedAt! : Date;
  };

  class Employee extends Model {
    public id!:number;
    public name!:String;
    public salary!: number;
    public department! : 'HR' | 'PS';

    //maybe need timestamps etc?
    // public readonly createdAt! : Date;
    // public readonly updatedAt! : Date;
  };

  Employee.init({
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },

    name:{
      type:DataTypes.STRING,
      allowNull:false
    },

    salary:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },

    department:{
      type:DataTypes.ENUM( 'HR','PS'),
      allowNull:false,
    }
  }, {sequelize, tableName: 'employees'});

  export default Employee;
