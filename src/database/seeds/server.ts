import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SeedsRunner } from './runner';
import { SeedsModule } from './seeds.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeedsModule)
    .then((appContext) => {
      const logger = new Logger('SeedsServer');
      const seeder = appContext.get(SeedsRunner);
      seeder
        .seed()
        .then(() => {
          logger.log('Seeding complete!');
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
