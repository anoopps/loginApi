import { Router } from "express";
import { login, profile, register } from "./authController";
import { loginValidation, registerValidation } from "./authValidation";
import { validateRequest } from "../../middleware/validationMiddleware";
import { authenticateToken } from "../../middleware/authMiddleware";

const router = Router();

router.post("/login", loginValidation, validateRequest, login);
router.get("/profile", authenticateToken, profile);
router.post("/register", registerValidation, register);

export default router;