import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllLanguagesInput,
  WhereDataFindAllLanguagesInput
} from '@/controllers/graphql/inputs/languages/find-all-languages.input';
import { Language } from '@/controllers/graphql/types/language';
import { Languages } from '@/controllers/graphql/types/languages';
import { FindAllLanguagesService } from '@/services/languages/find-all-languages';

@Resolver(() => Language)
export class LanguagesResolver {
  constructor(
    private readonly findAllLanguagesService: FindAllLanguagesService
  ) {}

  @Query(() => Languages)
  async languages(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllLanguagesInput,
      nullable: true
    })
    where: WhereDataFindAllLanguagesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllLanguagesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllLanguagesInput
  ) {
    return await this.findAllLanguagesService.execute({
      page,
      where,
      orderBy
    });
  }
}
