"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getDashboardStats = async (_req, res) => {
    try {
        const totalEmployees = await prisma_1.default.employee.count();
        const totalDepartments = await prisma_1.default.department.count();
        const totalHRManagers = await prisma_1.default.employee.count({
            where: {
                role: "HR_MANAGER",
            },
        });
        const activeEmployees = await prisma_1.default.employee.count({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getDashboardStats = getDashboardStats;
