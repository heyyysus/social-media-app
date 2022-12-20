import { Injectable } from '@nestjs/common';
import { User } from './users.models';
import { getAllUsers } from './users.repository';

@Injectable()
export class UsersService {
    async getUsers(): Promise<User[]> {
        return await getAllUsers();
    }
}