import { Request, Response } from "express";
import * as employeeService from "../services/employee.service";

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";

    const employees = await employeeService.getEmployees(
      page,
      limit,
      search
    );

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
    const employee = await employeeService.getEmployeeById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

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
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Employee updated successfully",
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
    await employeeService.deleteEmployee(req.params.id);

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

export const getOrganizationTree = async (
  _req: Request,
  res: Response
) => {
  try {
    const tree = await employeeService.getOrganizationTree();

    res.json({
      success: true,
      data: tree,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReportees = async (
  req: Request,
  res: Response
) => {
  try {
    const reportees = await employeeService.getReportees(req.params.id);

    res.json({
      success: true,
      data: reportees,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignManager = async (
  req: Request,
  res: Response
) => {
  try {
    const employee = await employeeService.assignManager(
      req.params.id,
      req.body.managerId
    );

    res.json({
      success: true,
      message: "Manager assigned successfully",
      data: employee,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};