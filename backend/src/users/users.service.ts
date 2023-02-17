import * as bcrypt from "bcrypt";
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";


export class EmailAlreadyExistsException extends Error {};
export class HandleAlreadyExistsException extends Error {};
export class UserNotFoundException extends Error {};

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ){}

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        return await this.usersRepository.findOne({
            where: {
                user_id: id,
            },
            relations: {
                followers: true,
                following: true,
            }
        });
    }

    async createUser({ email, handle, password }): Promise<User> {

        const checkExistingEmailQuery = await this.usersRepository.findBy({ email: email });
        if(checkExistingEmailQuery.length > 0) throw new EmailAlreadyExistsException();

        const checkExistingHandleQuery = await this.usersRepository.findBy({ handle: handle });
        if(checkExistingHandleQuery.length > 0) throw new HandleAlreadyExistsException();
        
        try {
            const hash = await bcrypt.hash(password, 10);
            const newUser = this.usersRepository.create({
                email: email, 
                handle: handle, 
                pw_hash: hash,
            });
            const savedUser = await this.usersRepository.save(newUser);
            delete savedUser.pw_hash;
            return savedUser;
        } catch (e) {
            throw e;
        }
    }

    async getUserByHandle(handle: string): Promise<User> {
        return await this.usersRepository.findOne(
            { 
                where: { handle: handle },
                relations: {
                    posts: true,
                    followers: true,
                    following: true,
                }
            });
    }

    async action(requestingUser: User, id: number, action: "follow" | "unfollow"): Promise<User>{
        try{
            const oldUser = await this.usersRepository.findOne({
                where: {
                    user_id: id,
                }, 
                relations: {
                    followers: true,
                }
            });

            if(!oldUser) throw new UserNotFoundException();

            switch(action){
                case "follow":
                    if(!oldUser.followers.some(f => f.user_id === requestingUser.user_id)){
                        oldUser.followers.push(requestingUser);
                        await this.usersRepository.save(oldUser);
                    }
                    break;
                case "unfollow":
                    const newFollowers = oldUser.followers.filter(f => f.user_id !== requestingUser.user_id)
                    oldUser.followers = newFollowers;
                    await this.usersRepository.save(oldUser);
                    break;
            }

            return this.usersRepository.findOne({
                where: {
                    user_id: id,
                },
                relations: {
                    followers: true,
                    following: true,
                    likes: true,
                }
            });

        } catch(e) {
            throw e;
        }
    }

    // async createUser(
    //     {email, handle, plaintext_password}: {email: string, handle: string, plaintext_password: string} 
    // ): Promise<User> {
    //     if(await getUserByEmail(email)) throw new ConflictException("Email already in use");
    //     else if(await getUserByHandle(handle)) throw new ConflictException("Handle already in use");
        
    //     try {
    //         const hash = await bcrypt.hash(plaintext_password, 10);

    //         const newUser: User = {
    //             email: email,
    //             handle: handle,
    //             pw_hash: hash,
    //         };

    //         const savedUser = createUser(newUser);
    //         if(!savedUser) throw new InternalServerErrorException();
    //         return savedUser;
            
    //     } catch (e) {
    //         console.log(e);
    //         throw new InternalServerErrorException();
    //     }
    // }
}