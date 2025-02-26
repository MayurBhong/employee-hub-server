import express from "express";
import authMiddleware from "../middleware/authMiddlware.js";
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", authMiddleware, getDepartments)
router.post("/add", authMiddleware, addDepartment)
router.get("/:id", authMiddleware, getDepartment)
router.put("/:id", authMiddleware, updateDepartment)
router.delete("/:id", authMiddleware, deleteDepartment)

export default router;