import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("OpenApi Specification")
    .setDescription('API Documentation')
    .setVersion("1.0")
    .addTag("auth")
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
      'JWT-auth'
    ).build();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,  // Automatically strip properties that do not have decorators
    forbidNonWhitelisted: true, // Throw an error if there are non-whitelisted properties
    forbidUnknownValues: true, // Throw an error if there are unknown values
  }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs",app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
