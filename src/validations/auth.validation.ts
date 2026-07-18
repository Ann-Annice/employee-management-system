import { z } from "zod";

export const registerSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),

  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  designation: z.string().min(2, "Designation is required"),

  // FIXED
  salary: z.coerce.number().positive("Salary must be greater than 0"),

  joiningDate: z.string().min(1, "Joining date is required"),

  departmentId: z.string().min(1, "Department is required"),

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
    .transform((value) => (value === "" ? undefined : value)),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});