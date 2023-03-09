import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllHerosDTO } from '@/dtos/heros/find-all-heros.dto';
import { HeroModel } from '@/models/hero.model';
import { FindAllHerosQuery } from '@/queries/implements/heros/find-all-heros.query';

@Injectable()
export class FindAllHerosService
  implements IBaseService<FindAllHerosDTO, Promise<IPaginatedType<HeroModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllHerosDTO): Promise<IPaginatedType<HeroModel>> {
    return await this.queryBus.execute(new FindAllHerosQuery(data));
  }
}
