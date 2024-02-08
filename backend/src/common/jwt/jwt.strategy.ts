import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../auth/user.entity";
import {ConfigService} from "@nestjs/config";
import {Repository} from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly config: ConfigService
    ) {
        super({
            secretOrKey: config.get<string>('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { email } = payload;
        const user: User = await this.userRepository.findOneBy({ email });

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}