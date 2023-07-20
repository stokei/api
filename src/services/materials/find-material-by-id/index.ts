import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { MaterialModel } from '@/models/material.model';
import { FindMaterialByIdQuery } from '@/queries/implements/materials/find-material-by-id.query';

@Injectable()
export class FindMaterialByIdService
  implements IBaseService<string, Promise<MaterialModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<MaterialModel> {
    return await this.queryBus.execute(new FindMaterialByIdQuery(data));
  }
}
