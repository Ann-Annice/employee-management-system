"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getDashboardStats = async () => {
    const totalEmployees = await prisma_1.default.employee.count();
    const activeEmployees = await prisma_1.default.employee.count({
        where: {
            status: "ACTIVE",
        },
    });
    const inactiveEmployees = await prisma_1.default.employee.count({
        where: {
            status: "INACTIVE",
        },
    });
    const totalDepartments = await prisma_1.default.department.count();
    return {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        totalDepartments,
    };
};
exports.getDashboardStats = getDashboardStats;
