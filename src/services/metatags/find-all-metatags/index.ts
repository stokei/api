import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { MetatagModel } from '@/models/metatag.model';
import { FindAllMetatagsDTO } from '@/dtos/metatags/find-all-metatags.dto';
import { FindAllMetatagsQuery } from '@/queries/implements/metatags/find-all-metatags.query';

@Injectable()
export class FindAllMetatagsService
  implements
    IBaseService<FindAllMetatagsDTO, Promise<IPaginatedType<MetatagModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllMetatagsDTO
  ): Promise<IPaginatedType<MetatagModel>> {
    return await this.queryBus.execute(new FindAllMetatagsQuery(data));
  }
}
