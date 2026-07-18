import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboardStats = async (
  _req: Request,
  res: Response
) => {
  try {
    const totalEmployees = await prisma.employee.count();

    const totalDepartments = await prisma.department.count();

    const totalHRManagers = await prisma.employee.count({
      where: {
        role: "HR_MANAGER",
      },
    });

    const activeEmployees = await prisma.employee.count({
      where: {
        status: "ACTIVE",
      },
    });

    res.json({
      success: true,
      data: {
        totalEmployees,
        totalDepartments,
        totalHRManagers,
        activeEmployees,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};