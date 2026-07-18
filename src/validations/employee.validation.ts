import { z } from "zod";

export const employeeSchema = z.object({
  employeeId: z
    .string()
    .min(1, "Employee ID is required"),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .regex(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits"
    ),

  designation: z
    .string()
    .min(2, "Designation is required"),

  salary: z
    .coerce
    .number()
    .min(1, "Salary must be greater than 0"),

  joiningDate: z
    .string()
    .min(1, "Joining Date is required"),

  departmentId: z
    .string()
    .min(1, "Department is required"),

  role: z
    .enum([
      "SUPER_ADMIN",
      "HR_MANAGER",
      "EMPLOYEE",
    ])
    .optional(),

  status: z
    .enum([
      "ACTIVE",
      "INACTIVE",
    ])
    .optional(),

  managerId: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? undefined : val)),
});