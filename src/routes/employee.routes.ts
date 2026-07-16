import { Router } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getOrganizationTree,
  getReportees,
  assignManager,
} from "../controllers/employee.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

// Employee APIs
router.get("/", getAllEmployees);
router.get("/organization/tree", getOrganizationTree);
router.get("/:id", getEmployeeById);
router.get("/:id/reportees", getReportees);

router.put("/:id", updateEmployee);
router.patch("/:id/manager", assignManager);

router.delete("/:id", deleteEmployee);

export default router;