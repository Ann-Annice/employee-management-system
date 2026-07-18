"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getDepartmentById = exports.createDepartment = exports.getDepartments = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getDepartments = async () => {
    return prisma_1.default.department.findMany({
        orderBy: {
            name: "asc",
        },
    });
};
exports.getDepartments = getDepartments;
const createDepartment = async (data) => {
    return prisma_1.default.department.create({
        data: {
            name: data.name,
            description: data.description,
        },
    });
};
exports.createDepartment = createDepartment;
const getDepartmentById = async (id) => {
    return prisma_1.default.department.findUnique({
        where: {
            id,
        },
    });
};
exports.getDepartmentById = getDepartmentById;
const updateDepartment = async (id, data) => {
    return prisma_1.default.department.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            description: data.description,
        },
    });
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = async (id) => {
    return prisma_1.default.department.delete({
        where: {
            id,
        },
    });
};
exports.deleteDepartment = deleteDepartment;
