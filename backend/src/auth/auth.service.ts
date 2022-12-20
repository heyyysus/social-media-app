import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import { BadRequestException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { usePool } from '../utils/db';

dotenv.config();

export interface AuthToken {
    token: string,
}

@Injectable()
export class AuthService {
    async GenerateAuthToken(email: string, plaintext_password: string): Promise<AuthToken>{

    const pool = await usePool();
    const sql = "SELECT user_id, pw_hash FROM users WHERE email=$1";
    const args = [ email ];
    const AUTH_SECRET = process.env.AUTHSECRET;

    try {
        const res = await pool.query(sql, args);
        if(res.rowCount === 1) {
            const row: {user_id: string, pw_hash: string} = res.rows[0];
            if(await bcrypt.compare(plaintext_password, row.pw_hash)){
                return { token: jwt.sign(row.user_id, AUTH_SECRET) };
            } else {
                throw new UnauthorizedException("Invalid Password");
            }
        } else {
            throw new UnauthorizedException("Invalid Email Address");
        }
    } catch(e) {
        console.log(e);
        throw (e instanceof HttpException) ? e : new InternalServerErrorException();
    }

    }
}
