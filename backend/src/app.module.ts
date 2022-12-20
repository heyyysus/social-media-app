import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/users.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UserService],
})
export class AppModule {}
