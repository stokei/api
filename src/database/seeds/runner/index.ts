import { Injectable, Logger } from '@nestjs/common';

import { PlansSeeds } from '../plans';

@Injectable()
export class SeedsRunner {
  private logger: Logger;
  constructor(private readonly plansSeeds: PlansSeeds) {
    this.logger = new Logger(SeedsRunner.name);
  }
  async seed() {
    await this.plansSeeds
      .execute()
      .then(() => {
        this.logger.log('Successfuly completed seeding plans...');
      })
      .catch((e) => {
        this.logger.error(e.message);
        this.logger.error('Failed seeding plans...');
      });
  }
}
