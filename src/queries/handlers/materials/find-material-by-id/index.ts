import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  MaterialNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { MaterialModel } from '@/models/material.model';
import { FindMaterialByIdQuery } from '@/queries/implements/materials/find-material-by-id.query';
import { FindMaterialByIdRepository } from '@/repositories/materials/find-material-by-id';

@QueryHandler(FindMaterialByIdQuery)
export class FindMaterialByIdQueryHandler
  implements IQueryHandler<FindMaterialByIdQuery>
{
  constructor(
    private readonly findMaterialByIdRepository: FindMaterialByIdRepository
  ) {}

  async execute(query: FindMaterialByIdQuery): Promise<MaterialModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const material = await this.findMaterialByIdRepository.execute(id);
    if (!material) {
      throw new MaterialNotFoundException();
    }
    return material;
  }
}
