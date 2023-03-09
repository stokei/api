import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { HeroModel } from '@/models/hero.model';
import { FindHeroByIdQuery } from '@/queries/implements/heros/find-hero-by-id.query';

@Injectable()
export class FindHeroByIdService
  implements IBaseService<string, Promise<HeroModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<HeroModel> {
    return await this.queryBus.execute(new FindHeroByIdQuery(data));
  }
}
