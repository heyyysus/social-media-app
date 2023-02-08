import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { EPost } from "./posts/epost.entity";
import { OpenAIService } from './openai/openai.service';
import { OpenaiModule } from './openai/openai.module';

dotenv.config();

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT),
  synchronize: (process.env.PRODUCTION) ? false : true,
  entities: [User, EPost],
};

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostsModule,
    TypeOrmModule.forRoot(ormConfig),
    OpenaiModule,
  ],
  controllers: [],
  providers: [OpenAIService],
})
export class AppModule {}
