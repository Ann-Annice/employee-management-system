"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("../controllers/department.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// Every department route requires login
router.use(auth_middleware_1.authenticate);
// SUPER_ADMIN and HR_MANAGER can view departments
router.get("/", (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER"), department_controller_1.getDepartments);
// SUPER_ADMIN and HR_MANAGER can view a department
router.get("/:id", (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER"), department_controller_1.getDepartmentById);
// SUPER_ADMIN and HR_MANAGER can create
router.post("/", (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER"), department_controller_1.createDepartment);
// SUPER_ADMIN and HR_MANAGER can update
router.put("/:id", (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER"), department_controller_1.updateDepartment);
// Only SUPER_ADMIN can delete
router.delete("/:id", (0, role_middleware_1.authorize)("SUPER_ADMIN"), department_controller_1.deleteDepartment);
exports.default = router;
