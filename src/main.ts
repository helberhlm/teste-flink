import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap')

  const app = await NestFactory.create(AppModule);
  app.enableCors()


  const options = new DocumentBuilder()
    .setTitle('FLINK - TEST')
    .setDescription('API - flink TEST')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)
  await app.listen(process.env.PORT || '80');
  logger.log(`Application listening on port ${process.env.PORT || '80'}`)

}
bootstrap();
