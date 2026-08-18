// auth service
import { findUserByEmail } from "./authRepository";
import { comparePassword } from "../../utils/password";

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


    return {
        message: "Login successful",
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }
    };
}