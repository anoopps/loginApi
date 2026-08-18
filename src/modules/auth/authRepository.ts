// authRepository
import pool from "../../config/database";

export const findUserByEmail = async (email: string) => {
    try {
        console.log("step1");
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [email]
        );
        console.log("step2");
        console.log(rows);
        return rows;

    } catch (error) {
        return null;
    }

}
