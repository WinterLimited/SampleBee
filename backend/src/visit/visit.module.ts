import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "../common/jwt/jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Visit} from "./visit.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Visit]),
  ],
  controllers: [VisitController, JwtStrategy],
  providers: [VisitService]
})
export class VisitModule {}
