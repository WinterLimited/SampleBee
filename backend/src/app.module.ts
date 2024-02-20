import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { VisitModule } from './visit/visit.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import {getTypeOrmConfig} from "./config/typeorm.config";
import { ChatModule } from './chat/chat.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [

      // ConfigModule을 AppModule에 추가
      ConfigModule.forRoot({
          isGlobal: true, // 전역적으로 ConfigModule 사용
      }),
      // TypeOrmModule을 AppModule에 추가
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getTypeOrmConfig,
      }),

      AuthModule,
      VisitModule,
      ChatModule,
      AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
