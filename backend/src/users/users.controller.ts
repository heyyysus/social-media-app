import { Controller, Get } from '@nestjs/common'
import User from '../models/User';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UserService) {}

@Get('getAll')
    async getUsers(): Promise<User[]> {
        const users = await this.usersService.getUsers();
        return users;
    }
}