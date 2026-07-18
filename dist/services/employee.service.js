"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportEmployeesToCSV = exports.importEmployeesFromCSV = exports.assignManager = exports.getReportees = exports.getOrganizationTree = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getEmployees = exports.createEmployee = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const json2csv_1 = require("json2csv");
const createEmployee = async (data) => {
    return prisma_1.default.employee.create({
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
exports.createEmployee = createEmployee;
const getEmployees = async (page = 1, limit = 10, search = "", departmentId = "", role = "", status = "", sort = "") => {
    const skip = (page - 1) * limit;
    const where = {
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
    let orderBy = {
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
    const employees = await prisma_1.default.employee.findMany({
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
    const total = await prisma_1.default.employee.count({
        where,
    });
    return {
        employees,
        total,
        page,
        limit,
    };
};
exports.getEmployees = getEmployees;
const getEmployeeById = async (id) => {
    return prisma_1.default.employee.findUnique({
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
exports.getEmployeeById = getEmployeeById;
const updateEmployee = async (id, data) => {
    const { departmentId, managerId, profileImage, joiningDate, salary, role, status, ...rest } = data;
    return prisma_1.default.employee.update({
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
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (id) => {
    return prisma_1.default.employee.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
};
exports.deleteEmployee = deleteEmployee;
const getOrganizationTree = async () => {
    return prisma_1.default.employee.findMany({
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
exports.getOrganizationTree = getOrganizationTree;
const getReportees = async (id) => {
    return prisma_1.default.employee.findMany({
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
exports.getReportees = getReportees;
const assignManager = async (employeeId, managerId) => {
    // Remove manager
    if (!managerId) {
        return prisma_1.default.employee.update({
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
    let currentManagerId = managerId;
    while (currentManagerId) {
        if (currentManagerId === employeeId) {
            throw new Error("Circular reporting is not allowed.");
        }
        const managerRecord = await prisma_1.default.employee.findUnique({
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
    return prisma_1.default.employee.update({
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
exports.assignManager = assignManager;
const importEmployeesFromCSV = async (filePath) => {
    return new Promise(async (resolve, reject) => {
        const employees = [];
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on("data", (row) => {
            employees.push(row);
        })
            .on("end", async () => {
            try {
                for (const emp of employees) {
                    const hashedPassword = await bcrypt_1.default.hash(emp.password || "password123", 10);
                    await prisma_1.default.employee.create({
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
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
exports.importEmployeesFromCSV = importEmployeesFromCSV;
const exportEmployeesToCSV = async () => {
    const employees = await prisma_1.default.employee.findMany({
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
    const parser = new json2csv_1.Parser();
    return parser.parse(data);
};
exports.exportEmployeesToCSV = exportEmployeesToCSV;
