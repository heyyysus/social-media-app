import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common'
import { User } from './users.models';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('')
    async getUsers(): Promise<User[]> {
        const users = await this.usersService.getUsers();
        return users;
    }

    @Post('')
    async createUser(
        @Body() { email, handle, plaintext_password }: {email: string, handle: string, plaintext_password: string}
    ): Promise<User> {
        if(!(email && handle && plaintext_password)) throw new BadRequestException();
        return await this.usersService.createUser({email, handle, plaintext_password});
    }
}