// auth service
import { findUserByEmail, register } from "./authRepository";
import { comparePassword, hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";
export interface registerResponse {
    success: boolean;
    message: string;
}

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

export const getProfile = async (email: string) => {

    const user = await findUserByEmail(email);

    if (!user) {
        return null;
    }

    return {
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }
    }

};

export const registerUser = async (firstname: string, lastname: string, email: string, password: string): Promise<registerResponse> => {

    // 1. check if user email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return {
            success: false,
            message: "Email Already Registered"
        }
    }

    // 2. if user not exists hashpassword using utils
    const maskPassword = await hashPassword(password);

    // 3. register User
    const result = await register(firstname, lastname, email, maskPassword);
    console.log(result);
    if (result) {
        return {
            success: true,
            message: "User Registration Successfull"
        }
    }

    return {
        success: false,
        message: "User Registration Failed"
    }
};