import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { HeroMapper } from '@/mappers/heros';
import { HeroModel } from '@/models/hero.model';
import { FindAllHerosQuery } from '@/queries/implements/heros/find-all-heros.query';
import { CountHerosRepository } from '@/repositories/heros/count-heros';
import { FindAllHerosRepository } from '@/repositories/heros/find-all-heros';

@QueryHandler(FindAllHerosQuery)
export class FindAllHerosQueryHandler
  implements IQueryHandler<FindAllHerosQuery>
{
  constructor(
    private readonly findAllHeroRepository: FindAllHerosRepository,
    private readonly countHerosRepository: CountHerosRepository
  ) {}

  async execute(query: FindAllHerosQuery): Promise<IPaginatedType<HeroModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new HeroMapper().toFindAllQueryClean(query);
    const heros = await this.findAllHeroRepository.execute(data);
    const totalCount = await this.countHerosRepository.execute({
      where: data.where
    });
    return new PaginationMapper<HeroModel>().toPaginationList({
      items: heros,
      page: data.page,
      totalCount
    });
  }
}
