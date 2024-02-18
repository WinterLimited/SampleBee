import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { VisitModule } from './visit/visit.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import {typeORMConfig} from "./config/typeorm.config";

@Module({
  imports: [

      // ConfigModule을 AppModule에 추가
      ConfigModule.forRoot({
          isGlobal: true, // 전역적으로 ConfigModule 사용
      }),
      // TypeOrmModule을 AppModule에 추가
      TypeOrmModule.forRoot(typeORMConfig),

      AuthModule,
      VisitModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
