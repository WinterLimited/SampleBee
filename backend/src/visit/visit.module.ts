// VisitModule
import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../common/jwt/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Visit } from "./visit.entity";
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Visit]),
    AuthModule,
  ],
  controllers: [VisitController],
  providers: [VisitService, JwtStrategy],
  exports: [JwtStrategy, TypeOrmModule.forFeature([Visit]),  PassportModule]
})
export class VisitModule {}
