"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const csvUpload_middleware_1 = __importDefault(require("../middleware/csvUpload.middleware"));
const router = (0, express_1.Router)();
// Every employee route requires login
router.use(auth_middleware_1.authenticate);
router.post("/", (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER"), upload_middleware_1.default.single("profileImage"), employee_controller_1.createEmployee);
router.post("/import", csvUpload_middleware_1.default.single("file"), employee_controller_1.importEmployees);
router.get("/export", (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER"), employee_controller_1.exportEmployees);
router.get("/", employee_controller_1.getAllEmployees);
router.get("/organization/tree", employee_controller_1.getOrganizationTree);
router.get("/:id", employee_controller_1.getEmployeeById);
router.get("/:id/reportees", employee_controller_1.getReportees);
// SUPER_ADMIN and HR_MANAGER can update
router.put("/:id", (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER"), upload_middleware_1.default.single("profileImage"), employee_controller_1.updateEmployee);
// SUPER_ADMIN and HR_MANAGER can assign manager
router.patch("/:id/manager", (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER"), employee_controller_1.assignManager);
// Only SUPER_ADMIN can delete
router.delete("/:id", (0, role_middleware_1.authorize)("SUPER_ADMIN"), employee_controller_1.deleteEmployee);
exports.default = router;
