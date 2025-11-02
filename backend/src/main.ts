import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Gym Manager API')
    .setDescription('API para gerenciamento de treinos.')
    .setVersion('1.0')
    .addTag('gym')
    .build();
  const docFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, docFactory());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
