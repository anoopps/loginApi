import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            user: JwtPayload & {
                userId: number;
                email: string;
            }
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // fetch authorization header from request    
    const authHeader = req.headers.authorization;

    // verify header
    if (!authHeader) {
        return res.status(401).json({ "message": "Authorization Required!" });
    }

    // verify token
    const [scheme, token] = authHeader.split(" ");
    if (scheme != "Bearer" || !token) {
        return res.status(401).json({ "message": "Invalid authorization header" })
    }


    try {
        // verify
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);

        req.user = decoded as {
            userId: number;
            email: string;
        };
        next();

    } catch (error) {
        return res.status(401).json({ "message": "Invalid token" });
    }
};