import prisma from "../config/prisma";

export const getDepartments = async () => {
  return prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const createDepartment = async (data: any) => {
  return prisma.department.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
};

export const getDepartmentById = async (id: string) => {
  return prisma.department.findUnique({
    where: {
      id,
    },
  });
};

export const updateDepartment = async (
  id: string,
  data: any
) => {
  return prisma.department.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
};

export const deleteDepartment = async (id: string) => {
  return prisma.department.delete({
    where: {
      id,
    },
  });
};