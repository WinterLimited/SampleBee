import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "../common/jwt/jwt.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [VisitController, JwtStrategy],
  providers: [VisitService]
})
export class VisitModule {}
