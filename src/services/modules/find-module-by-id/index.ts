import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ModuleModel } from '@/models/module.model';
import { FindModuleByIdQuery } from '@/queries/implements/modules/find-module-by-id.query';

@Injectable()
export class FindModuleByIdService
  implements IBaseService<string, Promise<ModuleModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ModuleModel> {
    return await this.queryBus.execute(new FindModuleByIdQuery(data));
  }
}
