import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository, SaveOptions } from 'typeorm';
import { EPost } from './epost.entity';

export class UnauthorizedRequest extends Error {};

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(EPost) private postsRepository: Repository<EPost>,
    ){};

    async getAll(): Promise<EPost[]> {
        return await this.postsRepository.find({
            relations: { user: true, likes: true },
            order: {
                createdDate: "DESC",
            }
        });
    }

    async getById(id: number): Promise<EPost> {
        return await this.postsRepository.findOne({
            where: { post_id: id },
            relations: { likes: true }
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

    async like(id: number, user: User,): Promise<EPost | null> {
        try {
            const oldPost: EPost = await this.postsRepository.findOne({
                where: {
                    post_id: id
                },
                relations: {
                    likes: true,
                    user: true,
                }
            });
            if(!oldPost) return null;

            if(oldPost.likes.some(u => {
                return u.user_id === user.user_id;
            })) return oldPost;

            oldPost.likes.push(user);

            const newPost = await this.postsRepository.save(oldPost);      
            
            return await this.postsRepository.findOne({
                where:{
                    post_id: newPost.post_id
                },
                relations: {
                    user: true,
                    likes: true,
                }
            });


        } catch(e){
            console.log(e);
            return null;
        }
    }

    async unlike(id: number, user: User,): Promise<EPost | null> {
        try {
            const oldPost: EPost = await this.postsRepository.findOne({
                where: {
                    post_id: id
                },
                relations: {
                    likes: true,
                    user: true,
                }
            });
            if(!oldPost) return null;

            const newLikes = oldPost.likes.filter(u => {
                return u.user_id !== user.user_id;
            });

            oldPost.likes = newLikes;

            const newPost = await this.postsRepository.save(oldPost);      
            
            return await this.postsRepository.findOne({
                where:{
                    post_id: newPost.post_id
                },
                relations: {
                    user: true,
                    likes: true,
                }
            });


        } catch(e){
            console.log(e);
            return null;
        }
    }
}
