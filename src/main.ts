import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { GeneralExceptionFilter } from './filters/general.filter';
import { allowedHeaders, allowedOrigins } from './utils/contants';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return Number(this.toString());
};

async function bootstrap() {
  const cors_settings = {
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders,
  };
  const app = await NestFactory.create(AppModule, { cors: cors_settings });
  app.useGlobalFilters(new GeneralExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

declare global {
  namespace PrismaJson {
    type SubscriptionFeatures = {
      name: string;
      isAllowed: boolean;
      size: number;
      unit?: string;
    }[];
  }
}
