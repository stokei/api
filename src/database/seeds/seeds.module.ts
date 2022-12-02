import { Module } from '@nestjs/common';

import { MainModule } from '@/main.module';

import { PlansSeeds } from './plans';
import { SeedsRunner } from './runner';

@Module({
  imports: [MainModule],
  providers: [PlansSeeds, SeedsRunner],
  exports: []
})
export class SeedsModule {}
