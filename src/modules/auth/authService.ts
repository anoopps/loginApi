// auth service
import { findUserByEmail } from "./authRepository";
import { comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";

export const login = async (email: string, password: string) => {

    const user = await findUserByEmail(email);

    // verify if user exists 
    if (!user) {
        return {
            message: "User not found"
        }
    }

    // verify the password is correct
    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
        return {
            message: "Invalid email or password"
        };
    }

    const token = generateToken(
        user.id,
        user.email
    );


    return {
        message: "Login successful",
        token,
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,

        }
    };
}