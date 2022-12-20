import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { usePool } from '../utils/db';

dotenv.config();

export interface AuthToken {
    token: string,
}

@Injectable()
export class AuthService {
    async GenerateAuthToken(email: string, plaintext_password: string): Promise<AuthToken | string>{

    const pool = await usePool();
    const sql = "SELECT user_id, pw_hash FROM users WHERE email=$1";
    const args = [ email ];
    const AUTH_SECRET = process.env.AUTHSECRET;

    try {
        const res = await pool.query(sql, args);
        if(res.rowCount === 1) {
            const row: {user_id: string, pw_hash: string} = res.rows[0];
            if(await bcrypt.compare(plaintext_password, row.pw_hash)){
                return { token: jwt.sign(row, AUTH_SECRET) };
            } else {
                return "Invalid Password";
            }
        } else {
            return "Invalid Email Address";
        }
    } catch(e) {
        console.log(e);
    }

    }
}
