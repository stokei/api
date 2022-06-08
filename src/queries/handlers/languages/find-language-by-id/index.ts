import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  LanguageNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { LanguageModel } from '@/models/language.model';
import { FindLanguageByIdRepository } from '@/repositories/languages/find-language-by-id';
import { FindLanguageByIdQuery } from '@/queries/implements/languages/find-language-by-id.query';

@QueryHandler(FindLanguageByIdQuery)
export class FindLanguageByIdQueryHandler
  implements IQueryHandler<FindLanguageByIdQuery>
{
  constructor(
    private readonly findLanguageByIdRepository: FindLanguageByIdRepository
  ) {}

  async execute(query: FindLanguageByIdQuery): Promise<LanguageModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const language = await this.findLanguageByIdRepository.execute(id);
    if (!language) {
      throw new LanguageNotFoundException();
    }
    return language;
  }
}
