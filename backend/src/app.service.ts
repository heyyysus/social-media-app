import { Injectable } from '@nestjs/common';
import User from './models/User';
import { getAllUsers } from './repositories/Users';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
