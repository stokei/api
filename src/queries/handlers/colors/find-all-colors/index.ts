import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ColorMapper } from '@/mappers/colors';
import { ColorModel } from '@/models/color.model';
import { FindAllColorsQuery } from '@/queries/implements/colors/find-all-colors.query';
import { CountColorsRepository } from '@/repositories/colors/count-colors';
import { FindAllColorsRepository } from '@/repositories/colors/find-all-colors';

@QueryHandler(FindAllColorsQuery)
export class FindAllColorsQueryHandler
  implements IQueryHandler<FindAllColorsQuery>
{
  constructor(
    private readonly findAllColorRepository: FindAllColorsRepository,
    private readonly countColorsRepository: CountColorsRepository
  ) {}

  async execute(
    query: FindAllColorsQuery
  ): Promise<IPaginatedType<ColorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ColorMapper().toFindAllQueryClean(query);
    const colors = await this.findAllColorRepository.execute(data);
    const totalCount = await this.countColorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ColorModel>().toPaginationList({
      items: colors,
      page: data.page,
      totalCount
    });
  }
}
