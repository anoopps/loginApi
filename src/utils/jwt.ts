import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

export const generateToken = (userId: number, email: string): string => {

    const token = jwt.sign({ userId: userId, email: email }, JWT_SECRET, { expiresIn: expiresIn });

    return token;

}