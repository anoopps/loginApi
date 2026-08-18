// auth service
import { findUserByEmail } from "./authRepository";

export const login = async (email: string, password: string) => {
    return findUserByEmail(email);
}