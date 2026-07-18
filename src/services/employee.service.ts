import prisma from "../config/prisma";
import fs from "fs";
import csv from "csv-parser";
import bcrypt from "bcrypt";
import { Parser } from "json2csv";

export const createEmployee = async (data: any) => {
  return prisma.employee.create({
    data: {
      employeeId: data.employeeId,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      designation: data.designation,
      salary: Number(data.salary),
      joiningDate: new Date(data.joiningDate),

      role: data.role ?? "EMPLOYEE",
      status: data.status ?? "ACTIVE",

      profileImage: data.profileImage ?? null,

      department: {
        connect: {
          id: data.departmentId,
        },
      },

      ...(data.managerId
        ? {
            manager: {
              connect: {
                id: data.managerId,
              },
            },
          }
        : {}),
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
  search = "",
  departmentId = "",
  role = "",
  status = "",
  sort = ""
) => {
  const skip = (page - 1) * limit;

  const where: any = {
  isDeleted: false,
};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        employeeId: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (departmentId) {
    where.departmentId = departmentId;
  }

  if (role) {
    where.role = role;
  }

  if (status) {
    where.status = status;
  }

  let orderBy: any = {
    createdAt: "desc",
  };

  if (sort === "name") {
    orderBy = {
      name: "asc",
    };
  }

  if (sort === "joiningDate") {
    orderBy = {
      joiningDate: "desc",
    };
  }

  const employees = await prisma.employee.findMany({
    where,
    skip,
    take: limit,
    orderBy,

    include: {
      department: true,
      manager: true,
      reportees: true,
    },
  });

  const total = await prisma.employee.count({
    where,
  });

  return {
    employees,
    total,
    page,
    limit,
  };
};

export const getEmployeeById = async (id: string) => {
  return prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      department: true,
      manager: true,
      reportees: true,
    },
  });
};

export const updateEmployee = async (
  id: string,
  data: any
) => {
  const {
    departmentId,
    managerId,
    profileImage,
    joiningDate,
    salary,
    role,
    status,
    ...rest
  } = data;

  return prisma.employee.update({
    where: {
      id,
    },

    data: {
      ...rest,

      ...(salary !== undefined && {
        salary: Number(salary),
      }),

      ...(joiningDate && {
        joiningDate: new Date(joiningDate),
      }),

      ...(role && {
        role,
      }),

      ...(status && {
        status,
      }),

      ...(profileImage && {
        profileImage,
      }),

      ...(departmentId && {
        department: {
          connect: {
            id: departmentId,
          },
        },
      }),

      ...(managerId
        ? {
            manager: {
              connect: {
                id: managerId,
              },
            },
          }
        : {
            manager: {
              disconnect: true,
            },
          }),
    },

    include: {
      department: true,
      manager: true,
      reportees: true,
    },
  });
};

export const deleteEmployee = async (id: string) => {
  return prisma.employee.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
};

export const getOrganizationTree = async () => {
  return prisma.employee.findMany({
    where: {
  managerId: null,
  isDeleted: false,
},

    include: {
      department: true,
      manager: true,
      reportees: {
        include: {
          department: true,
          reportees: true,
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });
};

export const getReportees = async (id: string) => {
 return prisma.employee.findMany({
  where: {
  managerId: id,
  isDeleted: false,
},
  include: {
    department: true,
    manager: true,
  },
});
};

export const assignManager = async (
  employeeId: string,
  managerId?: string
) => {
  // Remove manager
  if (!managerId) {
    return prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        manager: {
          disconnect: true,
        },
      },
      include: {
        department: true,
        manager: true,
        reportees: true,
      },
    });
  }

  // Employee cannot manage themselves
  if (employeeId === managerId) {
    throw new Error("Employee cannot be their own manager.");
  }

  // Check circular reporting
  let currentManagerId: string | null = managerId;

  while (currentManagerId) {
    if (currentManagerId === employeeId) {
      throw new Error("Circular reporting is not allowed.");
    }

    const managerRecord: {
      managerId: string | null;
    } | null = await prisma.employee.findUnique({
      where: {
        id: currentManagerId,
      },
      select: {
        managerId: true,
      },
    });

    if (!managerRecord) {
      break;
    }

    currentManagerId = managerRecord.managerId;
  }

  return prisma.employee.update({
    where: {
      id: employeeId,
    },
    data: {
      manager: {
        connect: {
          id: managerId,
        },
      },
    },
    include: {
      department: true,
      manager: true,
      reportees: true,
    },
  });
};

export const importEmployeesFromCSV = async (
  filePath: string
) => {
  return new Promise(async (resolve, reject) => {
    const employees: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        employees.push(row);
      })
      .on("end", async () => {
        try {
          for (const emp of employees) {
            const hashedPassword = await bcrypt.hash(
              emp.password || "password123",
              10
            );

            await prisma.employee.create({
              data: {
                employeeId: emp.employeeId,
                name: emp.name,
                email: emp.email,
                password: hashedPassword,
                phone: emp.phone,
                designation: emp.designation,
                salary: Number(emp.salary),
                joiningDate: new Date(emp.joiningDate),
                role: emp.role || "EMPLOYEE",
                status: emp.status || "ACTIVE",
                department: {
                  connect: {
                    id: emp.departmentId,
                  },
                },
              },
            });
          }

          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
  });
};
export const exportEmployeesToCSV = async () => {
  const employees = await prisma.employee.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      department: true,
      manager: true,
    },
  });

  const data = employees.map((emp) => ({
    employeeId: emp.employeeId,
    name: emp.name,
    email: emp.email,
    phone: emp.phone,
    designation: emp.designation,
    salary: emp.salary,
    joiningDate: emp.joiningDate,
    department: emp.department.name,
    manager: emp.manager?.name || "",
    role: emp.role,
    status: emp.status,
  }));

  const parser = new Parser();

  return parser.parse(data);
};