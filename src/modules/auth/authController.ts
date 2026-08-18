import { Request, Response } from "express";
import { login as loginService } from "./authService";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            throw new Error("Email not found!")
        }
        const result = await loginService(email, password);
        if (result) {
            res.json(result);
        } else {
            res.json({ success: false, "message": "User not found" });
        }


    } catch (error: any) {
        res.json({ success: false, "message": error.message });
    }

};

