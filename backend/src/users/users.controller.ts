import { Controller, Get } from '@nestjs/common'
import { User } from './users.models';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

@Get('getAll')
    async getUsers(): Promise<User[]> {
        const users = await this.usersService.getUsers();
        return users;
    }
}