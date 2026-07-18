"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
console.log("AUTH ROUTES LOADED");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const router = (0, express_1.Router)();
// Public Login
router.post("/login", auth_controller_1.login);
// Protected Register
router.post("/register", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("SUPER_ADMIN", "HR_MANAGER"), upload_middleware_1.default.single("profileImage"), auth_controller_1.register);
// Logout
router.post("/logout", auth_middleware_1.authenticate, auth_controller_1.logout);
router.get("/profile", auth_middleware_1.authenticate, auth_controller_1.getProfile);
exports.default = router;
