import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService],
})
export class AppModule {}
