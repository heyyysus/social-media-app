import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT),
  synchronize: (process.env.PRODUCTION) ? false : true,
  entities: [User],
};

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
