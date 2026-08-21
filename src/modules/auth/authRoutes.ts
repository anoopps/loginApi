import { Router } from "express";
import { login, profile } from "./authController";
import { loginValidation } from "./authValidation";
import { validateRequest } from "../../middleware/validationMiddleware";
import { authenticateToken } from "../../middleware/authMiddleware";

const router = Router();

router.post("/login", loginValidation, validateRequest, login);
router.get("/profile", authenticateToken, profile);

export default router;