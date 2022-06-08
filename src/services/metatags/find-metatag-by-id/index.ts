import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { MetatagModel } from '@/models/metatag.model';
import { FindMetatagByIdQuery } from '@/queries/implements/metatags/find-metatag-by-id.query';

@Injectable()
export class FindMetatagByIdService
  implements IBaseService<string, Promise<MetatagModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<MetatagModel> {
    return await this.queryBus.execute(new FindMetatagByIdQuery(data));
  }
}
