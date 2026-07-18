import { Request, Response } from "express";
import {
  loginEmployee,
  registerEmployee,
} from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";
import {
  loginSchema,
  registerSchema,
} from "../validations/auth.validation";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const data = registerSchema.parse(req.body);

    const result = await registerEmployee({
      ...data,

      // Convert null to undefined
      managerId: data.managerId || undefined,

      profileImage: req.file
        ? `/uploads/${req.file.filename}`
        : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Employee registered successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.errors?.[0]?.message ||
        error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginEmployee(
      data.email,
      data.password
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (
  _req: Request,
  res: Response
) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const employee =
      await prisma.employee.findUnique({
        where: {
          id: req.user?.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          designation: true,
          profileImage: true,
        },
      });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};