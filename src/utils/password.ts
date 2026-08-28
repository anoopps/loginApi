import bcrypt from "bcrypt";
const saltRounds = Number(process.env.SALT_ROUND) || 10;

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashPassword);
}
