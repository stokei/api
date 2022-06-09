import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllKeywordsDTO } from '@/dtos/keywords/find-all-keywords.dto';
import { KeywordModel } from '@/models/keyword.model';
import { FindAllKeywordsQuery } from '@/queries/implements/keywords/find-all-keywords.query';

@Injectable()
export class FindAllKeywordsService
  implements
    IBaseService<FindAllKeywordsDTO, Promise<IPaginatedType<KeywordModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllKeywordsDTO
  ): Promise<IPaginatedType<KeywordModel>> {
    return await this.queryBus.execute(new FindAllKeywordsQuery(data));
  }
}
