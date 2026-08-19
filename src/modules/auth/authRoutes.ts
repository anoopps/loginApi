import { Router } from "express";
import { login } from "./authController";
import { loginValidation } from "./authValidation";
import { validateRequest } from "../../middleware/validationMiddleware";

const router = Router();

router.post("/login", loginValidation, validateRequest, login);

export default router;