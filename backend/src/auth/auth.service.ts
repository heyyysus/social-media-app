import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import { BadRequestException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository, FindOptionsSelect } from 'typeorm';
import { User } from '../users/user.entity';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { usePool } from '../utils/db';

dotenv.config();

export interface AuthToken {
    token: string,
}

@Injectable()
export class AuthService {

    @InjectRepository(User)
    private userRepository: Repository<User>;

    async GenerateAuthToken(email: string, plaintext_password: string): Promise<AuthToken>{

    //const pool = await usePool();
    //const sql = "SELECT user_id, pw_hash FROM users WHERE email=$1";
    const AUTH_SECRET = process.env.AUTHSECRET;

    try {
        console.log(`email: ${email}, pw: ${plaintext_password}`);
        const res = await this.userRepository.findOne({ 
            where: { email: email },
            select: {
                user_id: {  },
                pw_hash: true,
            }
        });
        
        if(res) {
            const { pw_hash, user_id } = res;
            if(await bcrypt.compare(plaintext_password, pw_hash)){
                return { token: jwt.sign(user_id, AUTH_SECRET) };
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
