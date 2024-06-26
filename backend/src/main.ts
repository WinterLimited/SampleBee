import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 모든 API 경로에 /api 접두사 추가
  app.setGlobalPrefix('api');

  // CORS 설정
  // const allowedOrigins = process.env.CORS_ORIGIN.split(',');
  //
  // app.enableCors({
  //   origin: allowedOrigins,
  // });
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
