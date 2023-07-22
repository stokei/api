import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { MaterialMapper } from '@/mappers/materials';
import { MaterialModel } from '@/models/material.model';
import { FindAllMaterialsQuery } from '@/queries/implements/materials/find-all-materials.query';
import { CountMaterialsRepository } from '@/repositories/materials/count-materials';
import { FindAllMaterialsRepository } from '@/repositories/materials/find-all-materials';

@QueryHandler(FindAllMaterialsQuery)
export class FindAllMaterialsQueryHandler
  implements IQueryHandler<FindAllMaterialsQuery>
{
  constructor(
    private readonly findAllMaterialRepository: FindAllMaterialsRepository,
    private readonly countMaterialsRepository: CountMaterialsRepository
  ) {}

  async execute(
    query: FindAllMaterialsQuery
  ): Promise<IPaginatedType<MaterialModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new MaterialMapper().toFindAllQueryClean(query);
    const materials = await this.findAllMaterialRepository.execute(data);
    const totalCount = await this.countMaterialsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<MaterialModel>().toPaginationList({
      items: materials,
      page: data.page,
      totalCount
    });
  }
}
