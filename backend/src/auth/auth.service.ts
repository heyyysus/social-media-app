import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { Repository, FindOptionsSelect } from 'typeorm';
import { User } from '../users/user.entity';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
//import { usePool } from '../utils/db';

dotenv.config();

export interface AuthToken {
    token: string,
}

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ){};

    async validateUser(email: string, plaintext_password: string): Promise<any> {
        const AUTH_SECRET = process.env.AUTHSECRET;

        try {
            console.log(`email: ${email}, pw: ${plaintext_password}`);
            const res = await this.usersRepository.findOne({ 
                where: { email: email },
                select: {
                    user_id: {  },
                    pw_hash: true,
                }
            });
            
            if(res) {
                const { pw_hash, ...user } = res;
                if(await bcrypt.compare(plaintext_password, pw_hash)){
                    return user;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch(e) {
            console.log(e);
            return null;
        }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

    // async GenerateAuthToken(email: string, plaintext_password: string): Promise<AuthToken>{

    //     //const pool = await usePool();
    //     //const sql = "SELECT user_id, pw_hash FROM users WHERE email=$1";
    //     const AUTH_SECRET = process.env.AUTHSECRET;

    //     try {
    //         console.log(`email: ${email}, pw: ${plaintext_password}`);
    //         const res = await this.userRepository.findOne({ 
    //             where: { email: email },
    //             select: {
    //                 user_id: {  },
    //                 pw_hash: true,
    //             }
    //         });
            
    //         if(res) {
    //             const { pw_hash, user_id } = res;
    //             if(await bcrypt.compare(plaintext_password, pw_hash)){
    //                 return { token: jwt.sign(user_id, AUTH_SECRET) };
    //             } else {
    //                 throw new UnauthorizedException("Invalid Password");
    //             }
    //         } else {
    //             throw new UnauthorizedException("Invalid Email Address");
    //         }
    //     } catch(e) {
    //         console.log(e);
    //         throw (e instanceof HttpException) ? e : new InternalServerErrorException();
    //     }

    // }
}
