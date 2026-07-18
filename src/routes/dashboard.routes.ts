import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// Login required
router.use(authenticate);

// Only SUPER_ADMIN and HR_MANAGER can access dashboard statistics
router.get(
  "/stats",
  authorize("SUPER_ADMIN", "HR_MANAGER", "EMPLOYEE"),
  getDashboardStats
);
export default router;