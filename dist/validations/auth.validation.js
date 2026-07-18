"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    employeeId: zod_1.z.string().min(1, "Employee ID is required"),
    name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    phone: zod_1.z
        .string()
        .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    designation: zod_1.z.string().min(2, "Designation is required"),
    // FIXED
    salary: zod_1.z.coerce.number().positive("Salary must be greater than 0"),
    joiningDate: zod_1.z.string().min(1, "Joining date is required"),
    departmentId: zod_1.z.string().min(1, "Department is required"),
    role: zod_1.z
        .enum([
        "SUPER_ADMIN",
        "HR_MANAGER",
        "EMPLOYEE",
    ])
        .optional(),
    status: zod_1.z
        .enum([
        "ACTIVE",
        "INACTIVE",
    ])
        .optional(),
    managerId: zod_1.z
        .string()
        .optional()
        .nullable()
        .transform((value) => (value === "" ? undefined : value)),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
