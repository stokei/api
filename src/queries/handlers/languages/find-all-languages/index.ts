import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { LanguageMapper } from '@/mappers/languages';
import { LanguageModel } from '@/models/language.model';
import { FindAllLanguagesQuery } from '@/queries/implements/languages/find-all-languages.query';
import { CountLanguagesRepository } from '@/repositories/languages/count-languages';
import { FindAllLanguagesRepository } from '@/repositories/languages/find-all-languages';

@QueryHandler(FindAllLanguagesQuery)
export class FindAllLanguagesQueryHandler
  implements IQueryHandler<FindAllLanguagesQuery>
{
  constructor(
    private readonly findAllLanguageRepository: FindAllLanguagesRepository,
    private readonly countLanguagesRepository: CountLanguagesRepository
  ) {}

  async execute(
    query: FindAllLanguagesQuery
  ): Promise<IPaginatedType<LanguageModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new LanguageMapper().toFindAllQueryClean(query);
    const languages = await this.findAllLanguageRepository.execute(data);
    const totalCount = await this.countLanguagesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<LanguageModel>().toPaginationList({
      items: languages,
      page: data.page,
      totalCount
    });
  }
}
