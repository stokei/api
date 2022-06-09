import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllLanguagesDTO } from '@/dtos/languages/find-all-languages.dto';
import { LanguageModel } from '@/models/language.model';
import { FindAllLanguagesQuery } from '@/queries/implements/languages/find-all-languages.query';

@Injectable()
export class FindAllLanguagesService
  implements
    IBaseService<FindAllLanguagesDTO, Promise<IPaginatedType<LanguageModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllLanguagesDTO
  ): Promise<IPaginatedType<LanguageModel>> {
    return await this.queryBus.execute(new FindAllLanguagesQuery(data));
  }
}
