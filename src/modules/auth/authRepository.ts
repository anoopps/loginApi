// authRepository
import { RowDataPacket } from "mysql2";
import pool from "../../config/database";
import { User } from "./authTypes";

type UserRow = User & RowDataPacket;

export const findUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const [rows] = await pool.execute<UserRow[]>(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [email]
        );
        if (rows.length === 0) {
            return null;
        }
        return rows[0];

    } catch (error) {
        return null;
    }

}
