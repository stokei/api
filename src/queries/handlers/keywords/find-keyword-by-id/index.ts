import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  KeywordNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { KeywordModel } from '@/models/keyword.model';
import { FindKeywordByIdRepository } from '@/repositories/keywords/find-keyword-by-id';
import { FindKeywordByIdQuery } from '@/queries/implements/keywords/find-keyword-by-id.query';

@QueryHandler(FindKeywordByIdQuery)
export class FindKeywordByIdQueryHandler
  implements IQueryHandler<FindKeywordByIdQuery>
{
  constructor(
    private readonly findKeywordByIdRepository: FindKeywordByIdRepository
  ) {}

  async execute(query: FindKeywordByIdQuery): Promise<KeywordModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const keyword = await this.findKeywordByIdRepository.execute(id);
    if (!keyword) {
      throw new KeywordNotFoundException();
    }
    return keyword;
  }
}
