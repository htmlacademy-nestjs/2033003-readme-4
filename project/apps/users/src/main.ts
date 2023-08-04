import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
  
    const config = new DocumentBuilder()
      .setTitle('The «Users» service')
      .setDescription('Users service API')
      .setVersion('1.0')
      .build();
  
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
  
    const configService = app.get(ConfigService);
  
    const document = SwaggerModule.createDocument(app, config);
    
    SwaggerModule.setup('spec', app, document);
  
    const port = configService.getOrThrow('application.port');
    const host = configService.getOrThrow('application.host');
    const environment = configService.getOrThrow('application.environment');
  
    await app.listen(port);
    Logger.log(
      `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
    );
    Logger.log(
      `🎯  Current mode: ${environment}`
    )
  } catch (error) {
    Logger.error(error.message);
    process.exit(1);
  }
}

bootstrap();
