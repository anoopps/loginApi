// auth service
import { findUserByEmail } from "./authRepository";
import { comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";

export const login = async (email: string, password: string) => {

    // 1. find user my email
    const user = await findUserByEmail(email);

    // 2. verify if user exists 
    if (!user) {
        return {
            message: "User not found"
        }
    }

    // 3. verify the password is correct
    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
        return {
            message: "Invalid email or password"
        };
    }

    //4. generate token
    const token = generateToken(
        user.id,
        user.email
    );

    //5. return response
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