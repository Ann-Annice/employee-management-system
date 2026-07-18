import { Router } from "express";
console.log("AUTH ROUTES LOADED");

import {
  login,
  register,
  logout,
  getProfile,
} from "../controllers/auth.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();

// Public Login
router.post("/login", login);

// Protected Register
router.post(
  "/register",
  authenticate,
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  upload.single("profileImage"),
  register
);

// Logout
router.post("/logout", authenticate, logout);
router.get(
  "/profile",
  authenticate,
  getProfile
);

export default router;