"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.logout = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const prisma_1 = __importDefault(require("../config/prisma"));
const auth_validation_1 = require("../validations/auth.validation");
const register = async (req, res) => {
    try {
        const data = auth_validation_1.registerSchema.parse(req.body);
        const result = await (0, auth_service_1.registerEmployee)({
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
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.errors?.[0]?.message ||
                error.message,
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const data = auth_validation_1.loginSchema.parse(req.body);
        const result = await (0, auth_service_1.loginEmployee)(data.email, data.password);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
exports.login = login;
const logout = async (_req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};
exports.logout = logout;
const getProfile = async (req, res) => {
    try {
        const employee = await prisma_1.default.employee.findUnique({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.getProfile = getProfile;
