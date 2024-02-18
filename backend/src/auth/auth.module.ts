import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "../common/jwt/jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";

@Module({
  imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
      }),
      TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController, JwtStrategy],
  providers: [AuthService, PassportModule],
})
export class AuthModule {}
