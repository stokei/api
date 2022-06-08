import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ModuleModel } from '@/models/module.model';
import { FindAllModulesDTO } from '@/dtos/modules/find-all-modules.dto';
import { FindAllModulesQuery } from '@/queries/implements/modules/find-all-modules.query';

@Injectable()
export class FindAllModulesService
  implements
    IBaseService<FindAllModulesDTO, Promise<IPaginatedType<ModuleModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllModulesDTO): Promise<IPaginatedType<ModuleModel>> {
    return await this.queryBus.execute(new FindAllModulesQuery(data));
  }
}
