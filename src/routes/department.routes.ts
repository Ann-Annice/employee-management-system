import { Router } from "express";
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// Every department route requires login
router.use(authenticate);

// SUPER_ADMIN and HR_MANAGER can view departments
router.get(
  "/",
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  getDepartments
);

// SUPER_ADMIN and HR_MANAGER can view a department
router.get(
  "/:id",
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  getDepartmentById
);

// SUPER_ADMIN and HR_MANAGER can create
router.post(
  "/",
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  createDepartment
);

// SUPER_ADMIN and HR_MANAGER can update
router.put(
  "/:id",
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  updateDepartment
);

// Only SUPER_ADMIN can delete
router.delete(
  "/:id",
  authorize("SUPER_ADMIN"),
  deleteDepartment
);

export default router;