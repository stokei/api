import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ModulesMaterialModel } from '@/models/modules-material.model';
import { FindModulesMaterialByIdQuery } from '@/queries/implements/modules-materials/find-modules-material-by-id.query';

@Injectable()
export class FindModulesMaterialByIdService
  implements IBaseService<string, Promise<ModulesMaterialModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ModulesMaterialModel> {
    return await this.queryBus.execute(new FindModulesMaterialByIdQuery(data));
  }
}
