import prisma from "../config/prisma";

export const getDashboardStats = async () => {
  const totalEmployees = await prisma.employee.count();

  const activeEmployees = await prisma.employee.count({
    where: {
      status: "ACTIVE",
    },
  });

  const inactiveEmployees = await prisma.employee.count({
    where: {
      status: "INACTIVE",
    },
  });

  const totalDepartments = await prisma.department.count();

  return {
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    totalDepartments,
  };
};