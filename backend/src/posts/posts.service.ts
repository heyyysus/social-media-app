import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { EPost } from './epost.entity';

export class UnauthorizedRequest extends Error {};

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(EPost) private postsRepository: Repository<EPost>,
    ){};

    async getAll(): Promise<EPost[]> {
        return await this.postsRepository.find({
            relations: { user: true }
        });
    }

    async getById(id: number): Promise<EPost> {
        return await this.postsRepository.findOne({
            where: { post_id: id }
        });
    }

    async create(newPost: EPost, user: User): Promise<EPost> {
        newPost.user = user;
        return await this.postsRepository.save(newPost);
    }

    async update(editedPost: EPost): Promise<EPost> {
        try{
            const oldPost = await this.postsRepository.findOne({ 
                where: { post_id: editedPost.post_id},
                relations: { user: true }
            }); 
            if(!oldPost) return null;
            if(oldPost.user.user_id !== editedPost.user.user_id) throw new UnauthorizedRequest();
            oldPost.body = editedPost.body;
            return await this.postsRepository.save(oldPost);
        }
        catch(e){
            console.log(e);
            throw e;
        }
    }
}
