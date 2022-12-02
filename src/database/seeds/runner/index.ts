import { Injectable, Logger } from '@nestjs/common';

import { PlansSeeds } from '../plans';

@Injectable()
export class SeedsRunner {
  private logger: Logger;
  constructor(private readonly plansSeeds: PlansSeeds) {
    this.logger = new Logger();
  }
  async seed() {
    await this.plansSeeds
      .execute()
      .then(() => {
        this.logger.debug('Successfuly completed seeding plans...');
      })
      .catch(() => {
        this.logger.error('Failed seeding plans...');
      });
  }
}
