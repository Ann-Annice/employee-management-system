import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

export const getDashboardStats = async (
  _req: Request,
  res: Response
) => {
  try {
    const stats = await dashboardService.getDashboardStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};