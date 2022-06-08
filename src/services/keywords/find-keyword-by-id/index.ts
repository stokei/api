import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { KeywordModel } from '@/models/keyword.model';
import { FindKeywordByIdQuery } from '@/queries/implements/keywords/find-keyword-by-id.query';

@Injectable()
export class FindKeywordByIdService
  implements IBaseService<string, Promise<KeywordModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<KeywordModel> {
    return await this.queryBus.execute(new FindKeywordByIdQuery(data));
  }
}
