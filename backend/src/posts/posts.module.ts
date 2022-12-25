import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EPost } from './epost.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([EPost])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
