import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { StokeiApiServerInfo } from './enums/server-info.enum';
import { HOST, PORT } from './environments';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.listen(PORT, HOST, () => {
    Logger.log(`Microservise(${StokeiApiServerInfo.NAME}) started!`);
  });
}
bootstrap();
