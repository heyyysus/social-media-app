import { BadRequestException, Body, Controller, Get, HttpException, InternalServerErrorException, NotFoundException, Patch, Post, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { EPost } from './epost.entity';
import { PostsService, UnauthorizedRequest } from './posts.service';

@Controller('api/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async getAll(): Promise<EPost[]>{
        return await this.postsService.getAll();
    }

    @Get('findById')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER, Role.ADMIN)
    async findById(@Query('id') id: string): Promise<EPost>{
        const id_int = Number(id);
        if(!id_int) throw new BadRequestException();

        const found = await this.postsService.getById(id_int);
        if(!found) throw new NotFoundException();
        return found;
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER, Role.ADMIN)
    async create(@Body() newPost: EPost, @Req() req: any): Promise<EPost> {
        if(!newPost.body) throw new BadRequestException();
        return await this.postsService.create(newPost, req.user);
    }

    @Patch()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.USER, Role.ADMIN)
    async update(@Body() newPost: EPost, @Req() req: any): Promise<EPost> {
        newPost.user = req.user;
        console.log(newPost);
        try{
            const updatedPost = await this.postsService.update(newPost);
            if(!updatedPost) throw new NotFoundException();
            return updatedPost;
        } catch(e) {
            if(e instanceof HttpException) throw e;
            if(e instanceof UnauthorizedRequest) throw new UnauthorizedException();
            throw new InternalServerErrorException();
        }
    }
}
