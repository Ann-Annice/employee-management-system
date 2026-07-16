import { Request, Response } from "express";
import * as employeeService from "../services/employee.service";

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeeService.getEmployees();

    res.json({
      success: true,
      data: employees,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const employee = await employeeService.getEmployeeById(id);

    res.json({
      success: true,
      data: employee,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const employee = await employeeService.updateEmployee(id, req.body);

    res.json({
      success: true,
      data: employee,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await employeeService.deleteEmployee(id);

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};