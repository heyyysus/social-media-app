import { usePool } from "../utils/db";
import { User } from "./users.models";

export const getAllUsers = async (): Promise<User[]> => {
    const pool = await usePool();
    try { 
        const res = await pool.query('SELECT user_id, email, handle FROM users');
        return res.rows;
    }
    catch(e) {
        console.log(e);
    }
}

export const getUserById = async (user_id: Number): Promise<User | null> => {
    const pool = await usePool();
    try {
        const sql = 'SELECT user_id, email, handle FROM users WHERE user_id=$1';
        const res = await pool.query(sql, [ user_id ]);
        if(res.rowCount === 1) return res.rows[0];
        else return null;
    } catch(e) {
        console.log(e);
    }
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const pool = await usePool();
    try {
        const sql = 'SELECT user_id, email, handle FROM users WHERE email=$1';
        const res = await pool.query(sql, [ email ]);
        if(res.rowCount === 1) return res.rows[0];
        else return null;
    } catch(e) {
        console.log(e);
    }
}

export const getUserByHandle = async (handle: string): Promise<User | null> => {
    const pool = await usePool();
    try {
        const sql = 'SELECT user_id, email, handle FROM users WHERE handle=$1';
        const res = await pool.query(sql, [ handle ]);
        if(res.rowCount === 1) return res.rows[0];
        else return null;
    } catch(e) {
        console.log(e);
    }
}

export const createUser = async (user: User): Promise<User | null> => {
    const pool = await usePool();
    try {
        const sql = "INSERT INTO users (email, handle, pw_hash) VALUES ($1, $2, $3)";
        const res = await pool.query(sql, [ user.email, user.handle, user.pw_hash ]);
        if(res.rowCount === 1)
            return res[0];
        else 
            return null;
    } catch(e){
        console.log(e);
        return null;
    }
}