import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SeedsRunner } from './seeds/runner';
import { SeedsModule } from './seeds/seeds.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeedsModule)
    .then((appContext) => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(SeedsRunner);
      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding complete!');
        })
        .catch((error) => {
          logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
