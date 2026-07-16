import prisma from "../config/prisma";

export const createEmployee = async (data: any) => {
  return prisma.employee.create({
    data: {
      ...data,
      joiningDate: new Date(data.joiningDate),
      department: {
        connect: {
          id: data.departmentId,
        },
      },
      ...(data.managerId && {
        manager: {
          connect: {
            id: data.managerId,
          },
        },
      }),
    },
    include: {
      department: true,
      manager: true,
    },
  });
};

export const getEmployees = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            employeeId: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  const employees = await prisma.employee.findMany({
    where,
    skip,
    take: limit,
    include: {
      department: true,
      manager: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.employee.count({ where });

  return {
    employees,
    total,
    page,
    limit,
  };
};

export const getEmployeeById = async (id: string) => {
  return prisma.employee.findUnique({
    where: { id },
    include: {
      department: true,
      manager: true,
    },
  });
};

export const updateEmployee = async (
  id: string,
  data: any
) => {
  return prisma.employee.update({
    where: { id },
    data: {
      ...data,
      ...(data.departmentId && {
        department: {
          connect: {
            id: data.departmentId,
          },
        },
      }),
    },
    include: {
      department: true,
      manager: true,
    },
  });
};

export const deleteEmployee = async (id: string) => {
  return prisma.employee.delete({
    where: { id },
  });
};