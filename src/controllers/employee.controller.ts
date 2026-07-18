import { Request, Response } from "express";
import { employeeSchema } from "../validations/employee.validation";
import * as employeeService from "../services/employee.service";
import fs from "fs";


export const createEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const body = {
      ...req.body,
      salary: Number(req.body.salary),
    };

    const validatedData = employeeSchema.parse(body);

    const employee = await employeeService.createEmployee({
      ...validatedData,
      profileImage: req.file
        ? `/uploads/${req.file.filename}`
        : null,
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.errors || error.issues || error.message,
    });
  }
};

export const getAllEmployees = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = (req.query.search as string) || "";
    const departmentId =
      (req.query.departmentId as string) || "";
    const role = (req.query.role as string) || "";
    const status = (req.query.status as string) || "";
    const sort = (req.query.sort as string) || "";

    const employees =
      await employeeService.getEmployees(
        page,
        limit,
        search,
        departmentId,
        role,
        status,
        sort
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

export const getEmployeeById = async (
  req: Request,
  res: Response
) => {
  try {
    const employee =
      await employeeService.getEmployeeById(
        req.params.id
      );

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

export const updateEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    if (
      user.role !== "SUPER_ADMIN" &&
      user.role !== "HR_MANAGER"
    ) {
      if (user.id !== req.params.id) {
        return res.status(403).json({
          success: false,
          message: "Access Denied",
        });
      }
    }

    const body = {
      ...req.body,
      salary: Number(req.body.salary),
    };

    const validatedData = employeeSchema.parse(body);

    const employee =
      await employeeService.updateEmployee(
        req.params.id,
        {
          ...validatedData,
          ...(req.file && {
            profileImage: `/uploads/${req.file.filename}`,
          }),
        }
      );

    res.json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.errors || error.issues || error.message,
    });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    await employeeService.deleteEmployee(
      req.params.id
    );

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
    const tree =
      await employeeService.getOrganizationTree();

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
    const reportees =
      await employeeService.getReportees(
        req.params.id
      );

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
    const employee =
      await employeeService.assignManager(
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

export const importEmployees = async (
  req: Request,
  res: Response
) => {
  console.log("REQ.FILE:", req.file);
  console.log("REQ.BODY:", req.body);

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
    }

    await employeeService.importEmployeesFromCSV(req.file.path);

    return res.json({
      success: true,
      message: "Employees imported successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const exportEmployees = async (
  req: Request,
  res: Response
) => {
  try {
    const csv = await employeeService.exportEmployeesToCSV();

    res.header("Content-Type", "text/csv");

    res.attachment("employees.csv");

    return res.send(csv);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};