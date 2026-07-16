import { Request, Response } from "express";
import { loginEmployee, registerEmployee } from "../services/auth.service";
import {
  loginSchema,
  registerSchema,
} from "../validations/auth.validation";

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    const result = await registerEmployee(data);

    return res.status(201).json({
      success: true,
      message: "Employee registered successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
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