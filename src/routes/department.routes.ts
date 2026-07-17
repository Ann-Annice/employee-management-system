import { Router } from "express";
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

// GET all departments
router.get("/", getDepartments);

// GET department by ID
router.get("/:id", getDepartmentById);

// CREATE department
router.post("/", createDepartment);

// UPDATE department
router.put("/:id", updateDepartment);

// DELETE department
router.delete("/:id", deleteDepartment);

export default router;