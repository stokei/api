import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { LanguageModel } from '@/models/language.model';
import { FindLanguageByIdQuery } from '@/queries/implements/languages/find-language-by-id.query';

@Injectable()
export class FindLanguageByIdService
  implements IBaseService<string, Promise<LanguageModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<LanguageModel> {
    return await this.queryBus.execute(new FindLanguageByIdQuery(data));
  }
}
