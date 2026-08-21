import { Request, Response } from "express";
import { login as loginService, getProfile } from "./authService";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // validate email or password exist
        if (!email || !password) {
            throw new Error("Email/password is required!")
        }

        // verify user and validate the requested user
        const result = await loginService(email, password);

        if (result) {
            res.json(result);
        } else {
            return res.status(200).json({ success: false, "message": "User not found" });
        }

    } catch (error: any) {
        res.status(400).json({ success: false, "message": error.message });
    }

};

export const profile = async (req: Request, res: Response) => {
    try {
        console.log(req.user);
        const userEmail = req.user.email;

        if (!userEmail) {
            return res.status(401).json({ "message": "User not found" });
        }

        getProfile(userEmail)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });

    } catch (error) {
        res.status(400).json({ success: false, "message": "Invalid user!" })
    }
};

