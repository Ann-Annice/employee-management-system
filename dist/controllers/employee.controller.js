"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportEmployees = exports.importEmployees = exports.assignManager = exports.getReportees = exports.getOrganizationTree = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getAllEmployees = exports.createEmployee = void 0;
const employee_validation_1 = require("../validations/employee.validation");
const employeeService = __importStar(require("../services/employee.service"));
const createEmployee = async (req, res) => {
    try {
        const body = {
            ...req.body,
            salary: Number(req.body.salary),
        };
        const validatedData = employee_validation_1.employeeSchema.parse(body);
        const employee = await employeeService.createEmployee({
            ...validatedData,
            profileImage: req.file
                ? `/uploads/${req.file.filename}`
                : null,
        });
        return res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.errors || error.issues || error.message,
        });
    }
};
exports.createEmployee = createEmployee;
const getAllEmployees = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const departmentId = req.query.departmentId || "";
        const role = req.query.role || "";
        const status = req.query.status || "";
        const sort = req.query.sort || "";
        const employees = await employeeService.getEmployees(page, limit, search, departmentId, role, status, sort);
        return res.json({
            success: true,
            data: employees,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeById(String(req.params.id));
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
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getEmployeeById = getEmployeeById;
const updateEmployee = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "SUPER_ADMIN" &&
            user.role !== "HR_MANAGER") {
            if (user.id !== String(req.params.id)) {
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
        const validatedData = employee_validation_1.employeeSchema.parse(body);
        const employee = await employeeService.updateEmployee(String(req.params.id), {
            ...validatedData,
            ...(req.file && {
                profileImage: `/uploads/${req.file.filename}`,
            }),
        });
        return res.json({
            success: true,
            message: "Employee updated successfully",
            data: employee,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.errors || error.issues || error.message,
        });
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res) => {
    try {
        await employeeService.deleteEmployee(String(req.params.id));
        return res.json({
            success: true,
            message: "Employee deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteEmployee = deleteEmployee;
const getOrganizationTree = async (_req, res) => {
    try {
        const tree = await employeeService.getOrganizationTree();
        return res.json({
            success: true,
            data: tree,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getOrganizationTree = getOrganizationTree;
const getReportees = async (req, res) => {
    try {
        const reportees = await employeeService.getReportees(String(req.params.id));
        return res.json({
            success: true,
            data: reportees,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getReportees = getReportees;
const assignManager = async (req, res) => {
    try {
        const employee = await employeeService.assignManager(String(req.params.id), String(req.body.managerId));
        return res.json({
            success: true,
            message: "Manager assigned successfully",
            data: employee,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.assignManager = assignManager;
const importEmployees = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.importEmployees = importEmployees;
const exportEmployees = async (_req, res) => {
    try {
        const csv = await employeeService.exportEmployeesToCSV();
        res.header("Content-Type", "text/csv");
        res.attachment("employees.csv");
        return res.send(csv);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.exportEmployees = exportEmployees;
