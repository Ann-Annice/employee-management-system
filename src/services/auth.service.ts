import prisma from "../config/prisma";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

interface RegisterDto {
  employeeId: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  designation: string;
  salary: number;
  joiningDate: string;
  departmentId: string;
  managerId?: string;
}

export const registerEmployee = async (data: RegisterDto) => {
  const existing = await prisma.employee.findFirst({
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

  const hashedPassword = await hashPassword(data.password);

  const employee = await prisma.employee.create({
    data: {
      employeeId: data.employeeId,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      designation: data.designation,
      salary: data.salary,
      joiningDate: new Date(data.joiningDate),

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

  const token = generateToken(employee.id, employee.role);

  return {
    token,
    employee
  };
};

export const loginEmployee = async (
  email: string,
  password: string
) => {
  const employee = await prisma.employee.findUnique({
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

  const valid = await comparePassword(
    password,
    employee.password
  );

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(employee.id, employee.role);

  return {
    token,
    employee
  };
};