import { Injectable } from '@nestjs/common';
import User from '../models/User';
import { getAllUsers } from '../repositories/Users';

@Injectable()
export class UserService {
    async getUsers(): Promise<User[]> {
        return await getAllUsers();
    }
}