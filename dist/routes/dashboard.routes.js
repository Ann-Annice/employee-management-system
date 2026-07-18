"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// Login required
router.use(auth_middleware_1.authenticate);
// Only SUPER_ADMIN and HR_MANAGER can access dashboard statistics
router.get("/stats", (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER", "EMPLOYEE"), dashboard_controller_1.getDashboardStats);
exports.default = router;
