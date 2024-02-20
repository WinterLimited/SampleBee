import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../auth/user.entity";
import {Visit} from "../visit/visit.entity";
import {JwtStrategy} from "../common/jwt/jwt.strategy";

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
    TypeOrmModule.forFeature([User, Visit]),
  ],
  controllers: [AdminController],
  providers: [AdminService, PassportModule, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AdminModule {}
