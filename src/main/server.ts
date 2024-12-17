import '../infra/observability/telemetry/telemetry';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import logger from '@src/infra/observability/logger/logger';
import { useRequestLogging } from '@src/utils/use-request.logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
    bufferLogs: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Authentication Microservice')
    .setDescription('The authentication API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Coloque aqui seu token jwt',
        in: 'header',
      },
      'Authorization', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  // useRequestLogging(app.getHttpAdapter().getInstance());

  await app.listen(3001);
}
bootstrap();
