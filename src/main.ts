import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { StokeiApiServerInfo } from './enums/server-info.enum';
import { HOST, PORT } from './environments';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

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

  app.listen(PORT, HOST, async () => {
    Logger.log(
      `API(${StokeiApiServerInfo.NAME}) started at ${await app.getUrl()}!`
    );
  });
}
bootstrap();
