import { Request, Response } from "express";
import { login as loginService, getProfile, registerUser } from "./authService";

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

export const register = async (req: Request, res: Response) => {

    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !email || !password) {
        return res.status(401).json({ "message": "Invalid parameter" });
    }


    const result = await registerUser(firstname, lastname, email, password);
    console.log(result);

    if (!result.success) {
        return res.status(410).json({
            "message": result.message
        })
    }

    return res.status(201).json({ "message": "User Sucessfully registered" })
}