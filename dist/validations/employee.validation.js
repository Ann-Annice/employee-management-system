"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSchema = void 0;
const zod_1 = require("zod");
exports.employeeSchema = zod_1.z.object({
    employeeId: zod_1.z
        .string()
        .min(1, "Employee ID is required"),
    name: zod_1.z
        .string()
        .min(3, "Name must be at least 3 characters"),
    email: zod_1.z
        .string()
        .email("Invalid email address"),
    phone: zod_1.z
        .string()
        .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    designation: zod_1.z
        .string()
        .min(2, "Designation is required"),
    salary: zod_1.z
        .coerce
        .number()
        .min(1, "Salary must be greater than 0"),
    joiningDate: zod_1.z
        .string()
        .min(1, "Joining Date is required"),
    departmentId: zod_1.z
        .string()
        .min(1, "Department is required"),
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
        .transform((val) => (val === "" ? undefined : val)),
});
