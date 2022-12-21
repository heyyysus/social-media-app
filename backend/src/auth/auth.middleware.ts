import { BadRequestException, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
//import { getUserById } from '../users/users.repository';
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

export function RequireAuthentication(req: Request, res: Response, next: NextFunction){
    // const AUTH_SECRET = process.env.AUTHSECRET;
    // try {
    //     const token = req.header("Authorization");
    //     const decoded: string = jwt.verify(token, AUTH_SECRET).toString();
    //     const user_id = parseInt(decoded);
        
    //     getUserById(user_id)
    //     .then(user => {
    //         req.currentUser = user;
    //         next();
    //     })
    //     .catch(e => {
    //         console.log(e);
    //         throw e;
    //     })
        
    // } catch(e) {
    //     console.log(e);
    //     throw (e instanceof HttpException) ? e : new BadRequestException();
    // }
}