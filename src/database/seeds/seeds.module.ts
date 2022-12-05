import { Module } from '@nestjs/common';

import { MainModule } from '@/main.module';

import { AccountsSeeds } from './accounts';
import { AppsSeeds } from './apps';
import { CurrenciesSeeds } from './currencies';
import { LanguagesSeeds } from './languages';
import { PlansSeeds } from './plans';
import { SeedsRunner } from './runner';

@Module({
  imports: [MainModule],
  providers: [
    CurrenciesSeeds,
    LanguagesSeeds,
    AccountsSeeds,
    AppsSeeds,
    PlansSeeds,
    SeedsRunner
  ],
  exports: []
})
export class SeedsModule {}
