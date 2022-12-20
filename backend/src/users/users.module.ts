import { NestModule, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RequireAuthentication } from '../auth/auth.middleware';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequireAuthentication)
            .forRoutes({ path: "api/users", method: RequestMethod.GET });
    }
}
