import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllModulesMaterialsDTO } from '@/dtos/modules-materials/find-all-modules-materials.dto';
import { ModulesMaterialModel } from '@/models/modules-material.model';
import { FindAllModulesMaterialsQuery } from '@/queries/implements/modules-materials/find-all-modules-materials.query';

@Injectable()
export class FindAllModulesMaterialsService
  implements
    IBaseService<
      FindAllModulesMaterialsDTO,
      Promise<IPaginatedType<ModulesMaterialModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllModulesMaterialsDTO
  ): Promise<IPaginatedType<ModulesMaterialModel>> {
    return await this.queryBus.execute(new FindAllModulesMaterialsQuery(data));
  }
}
