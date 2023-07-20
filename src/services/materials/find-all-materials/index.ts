import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllMaterialsDTO } from '@/dtos/materials/find-all-materials.dto';
import { MaterialModel } from '@/models/material.model';
import { FindAllMaterialsQuery } from '@/queries/implements/materials/find-all-materials.query';

@Injectable()
export class FindAllMaterialsService
  implements
    IBaseService<FindAllMaterialsDTO, Promise<IPaginatedType<MaterialModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllMaterialsDTO
  ): Promise<IPaginatedType<MaterialModel>> {
    return await this.queryBus.execute(new FindAllMaterialsQuery(data));
  }
}
