import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  assignManager,
  getOrganizationTree,
  getReportees,
  importEmployees,
  exportEmployees,
} from "../controllers/employee.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import upload from "../middleware/upload.middleware";
import csvUpload from "../middleware/csvUpload.middleware";

const router = Router();

// Every employee route requires login
router.use(authenticate);
router.post(
  "/",
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  upload.single("profileImage"),
  createEmployee
);
router.post(
  "/import",
  csvUpload.single("file"),
  importEmployees
);
router.get(
  "/export",
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  exportEmployees
);
router.get("/", getAllEmployees);
router.get("/organization/tree", getOrganizationTree);
router.get("/:id", getEmployeeById);
router.get("/:id/reportees", getReportees);

// SUPER_ADMIN and HR_MANAGER can update
router.put(
  "/:id",
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  upload.single("profileImage"),
  updateEmployee
);


// SUPER_ADMIN and HR_MANAGER can assign manager
router.patch(
  "/:id/manager",
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  assignManager
);

// Only SUPER_ADMIN can delete
router.delete(
  "/:id",
  authorize("SUPER_ADMIN"),
  deleteEmployee
);

export default router;