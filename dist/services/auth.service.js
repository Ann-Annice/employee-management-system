"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEmployee = exports.registerEmployee = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const registerEmployee = async (data) => {
    const existing = await prisma_1.default.employee.findFirst({
        where: {
            OR: [
                { email: data.email },
                { employeeId: data.employeeId }
            ]
        }
    });
    if (existing) {
        throw new Error("Employee already exists");
    }
    const hashedPassword = await (0, hash_1.hashPassword)(data.password);
    const employee = await prisma_1.default.employee.create({
        data: {
            employeeId: data.employeeId,
            name: data.name,
            email: data.email,
            password: hashedPassword,
            phone: data.phone,
            designation: data.designation,
            salary: data.salary,
            joiningDate: new Date(data.joiningDate),
            profileImage: data.profileImage,
            department: {
                connect: {
                    id: data.departmentId
                }
            },
            ...(data.managerId && {
                manager: {
                    connect: {
                        id: data.managerId
                    }
                }
            })
        },
        include: {
            department: true,
            manager: true
        }
    });
    const token = (0, jwt_1.generateToken)(employee.id, employee.role);
    return {
        token,
        employee
    };
};
exports.registerEmployee = registerEmployee;
const loginEmployee = async (email, password) => {
    const employee = await prisma_1.default.employee.findUnique({
        where: {
            email
        },
        include: {
            department: true,
            manager: true
        }
    });
    if (!employee) {
        throw new Error("Invalid credentials");
    }
    const valid = await (0, hash_1.comparePassword)(password, employee.password);
    if (!valid) {
        throw new Error("Invalid credentials");
    }
    const token = (0, jwt_1.generateToken)(employee.id, employee.role);
    return {
        token,
        employee
    };
};
exports.loginEmployee = loginEmployee;
