import { Injectable, Logger } from '@nestjs/common';

import { AccountsSeeds } from '@/database/seeds/accounts';
import { AppsSeeds } from '@/database/seeds/apps';
import { CurrenciesSeeds } from '@/database/seeds/currencies';
import { LanguagesSeeds } from '@/database/seeds/languages';
import { PlansSeeds } from '@/database/seeds/plans';
import { sleep } from '@/utils/sleep';

@Injectable()
export class SeedsRunner {
  private logger: Logger;
  constructor(
    private readonly plansSeeds: PlansSeeds,
    private readonly currenciesSeeds: CurrenciesSeeds,
    private readonly languagesSeeds: LanguagesSeeds,
    private readonly appsSeeds: AppsSeeds,
    private readonly accountsSeeds: AccountsSeeds
  ) {
    this.logger = new Logger(SeedsRunner.name);
  }
  async seed() {
    const DELAY_ONE_SECOND = 1000;
    try {
      await this.currenciesSeeds.execute();
      this.logger.log('Successfuly completed seeding currencies...');
      await sleep(DELAY_ONE_SECOND);
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error('Failed seeding currencies...');
    }
    try {
      await this.languagesSeeds.execute();
      this.logger.log('Successfuly completed seeding languages...');
      await sleep(DELAY_ONE_SECOND);
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error('Failed seeding languages...');
    }
    try {
      await this.appsSeeds.execute();
      this.logger.log('Successfuly completed seeding apps...');
      await sleep(DELAY_ONE_SECOND);
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error('Failed seeding apps...');
    }
    try {
      await this.accountsSeeds.execute();
      this.logger.log('Successfuly completed seeding accounts...');
      await sleep(DELAY_ONE_SECOND);
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error('Failed seeding accounts...');
    }
    try {
      await this.plansSeeds.execute();
      this.logger.log('Successfuly completed seeding plans...');
      await sleep(DELAY_ONE_SECOND);
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error('Failed seeding plans...');
    }
  }
}
