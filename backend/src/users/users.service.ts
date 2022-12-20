import * as bcrypt from "bcrypt";
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './users.models';
import { getAllUsers, getUserByEmail, getUserByHandle, createUser } from './users.repository';


@Injectable()
export class UsersService {
    async getUsers(): Promise<User[]> {
        return await getAllUsers();
    }

    async createUser(
        {email, handle, plaintext_password}: {email: string, handle: string, plaintext_password: string} 
    ): Promise<User> {
        if(await getUserByEmail(email)) throw new ConflictException("Email already in use");
        else if(await getUserByHandle(handle)) throw new ConflictException("Handle already in use");
        
        try {
            const hash = await bcrypt.hash(plaintext_password, 10);

            const newUser: User = {
                email: email,
                handle: handle,
                pw_hash: hash,
            };

            const savedUser = createUser(newUser);
            if(!savedUser) throw new InternalServerErrorException();
            return savedUser;
            
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}