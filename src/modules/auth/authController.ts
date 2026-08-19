import { Request, Response } from "express";
import { login as loginService } from "./authService";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error("Email/password is required!")
        }
        // verify user and validate the requested user
        const result = await loginService(email, password);
        if (result) {
            res.json(result);
        } else {
            res.status(200).json({ success: false, "message": "User not found" });
        }
    } catch (error: any) {
        res.status(400).json({ success: false, "message": error.message });
    }

};

