import { Request, Response } from "express";
import * as departmentService from "../services/department.service";

export const getDepartments = async (
  _req: Request,
  res: Response
) => {
  try {
    const departments = await departmentService.getDepartments();

    res.json({
      success: true,
      data: departments,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const department = await departmentService.getDepartmentById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.json({
      success: true,
      data: department,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createDepartment = async (
  req: Request,
  res: Response
) => {
  try {
    const department = await departmentService.createDepartment(req.body);

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const department = await departmentService.updateDepartment(
      id,
      req.body
    );

    res.json({
      success: true,
      message: "Department updated successfully",
      data: department,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    await departmentService.deleteDepartment(id);

    res.json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};