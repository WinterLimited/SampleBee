import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      AuthModule,

      // ConfigModule을 AppModule에 추가
      ConfigModule.forRoot({
        isGlobal: true, // 전역적으로 ConfigModule 사용
      }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
