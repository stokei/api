import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  HeroNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { HeroModel } from '@/models/hero.model';
import { FindHeroByIdQuery } from '@/queries/implements/heros/find-hero-by-id.query';
import { FindHeroByIdRepository } from '@/repositories/heros/find-hero-by-id';

@QueryHandler(FindHeroByIdQuery)
export class FindHeroByIdQueryHandler
  implements IQueryHandler<FindHeroByIdQuery>
{
  constructor(
    private readonly findHeroByIdRepository: FindHeroByIdRepository
  ) {}

  async execute(query: FindHeroByIdQuery): Promise<HeroModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const hero = await this.findHeroByIdRepository.execute(id);
    if (!hero) {
      throw new HeroNotFoundException();
    }
    return hero;
  }
}
