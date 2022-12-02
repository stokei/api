import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { StokeiApiServerInfo } from '@/enums/server-info.enum';
import { SERVER_HOST, SERVER_PORT } from '@/environments';
import { MainModule } from '@/main.module';

export const createApp = async () => {
  const app = await NestFactory.create<NestExpressApplication>(MainModule, {
    bodyParser: false
  });

  app.enableCors({
    origin: '*'
  });

  app.enableVersioning({
    type: VersioningType.URI
  });

  const config = new DocumentBuilder()
    .setTitle('Stokei API')
    .setDescription('Stokei RESTfull API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Stokei')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.listen(SERVER_PORT, SERVER_HOST, async () => {
    Logger.log(
      `API(${StokeiApiServerInfo.NAME}) started at ${await app.getUrl()}!`
    );
  });
  return app;
};
