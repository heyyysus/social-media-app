import * as dotenv from "dotenv";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { Role } from "./enums/role.enum";

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTHSECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({ where: { user_id: payload.sub } });
    if(user) return user;
    return { user_id: payload.sub, email: payload.email, role: Role.USER };
  }
}
