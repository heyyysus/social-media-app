import { usePool } from "../utils/db";
import User from "../models/User";

export const getAllUsers = async (): Promise<User[]> => {
    const pool = await usePool();
    try { 
        const res = await pool.query<User>('SELECT user_id, email, handle FROM users');
        return res.rows;
    }
    catch(e) {
        console.log(e);
    }
}