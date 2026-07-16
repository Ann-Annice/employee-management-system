import { z } from "zod";

export const registerSchema = z.object({
  employeeId: z.string().min(1),
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  designation: z.string().min(2),
  salary: z.number().positive(),
  joiningDate: z.string(),
  departmentId: z.string(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});