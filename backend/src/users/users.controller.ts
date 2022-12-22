import { BadRequestException, Body, ConflictException, Controller, Get, InternalServerErrorException, NotFoundException, Post, Query, UseGuards } from '@nestjs/common'
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from './user.entity';
import { EmailAlreadyExistsException, HandleAlreadyExistsException, UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get('')
    async getUsers(): Promise<User[]> {
        const users = await this.usersService.getUsers();
        return users;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER)
    @Get('findByHandle')
    async getUserByHandle(@Query('handle') handle): Promise<User> {
        const user = await this.usersService.getUserByHandle(handle);
        if(!user) throw new NotFoundException();
        return user;
    }

    @Post('')
    async createUser(
        @Body() { email, handle, password }: {email: string, handle: string, password: string}
    ): Promise<User> {
        if(!(email && handle && password)) throw new BadRequestException("Form data missing");

        try {
            return await this.usersService.createUser({ email, handle, password });
        } catch(e) {
            console.log(e);
            if(e instanceof EmailAlreadyExistsException) throw new ConflictException("Email already exists");
            if(e instanceof HandleAlreadyExistsException) throw new ConflictException("Handle already exists");
            else throw new InternalServerErrorException();
        }
    }


    // @Post('')
    // async createUser(
    //     @Body() { email, handle, plaintext_password }: {email: string, handle: string, plaintext_password: string}
    // ): Promise<User> {
    //     if(!(email && handle && plaintext_password)) throw new BadRequestException();
    //     return await this.usersService.createUser({email, handle, plaintext_password});
    // }
}