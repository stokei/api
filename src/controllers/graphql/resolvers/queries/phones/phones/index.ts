import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllPhonesInput,
  WhereDataFindAllPhonesInput
} from '@/controllers/graphql/inputs/phones/find-all-phones.input';
import { Phone } from '@/controllers/graphql/types/phone';
import { Phones } from '@/controllers/graphql/types/phones';
import { FindAllPhonesService } from '@/services/phones/find-all-phones';

@Resolver(() => Phone)
export class PhonesResolver {
  constructor(private readonly findAllPhonesService: FindAllPhonesService) {}

  @Query(() => Phones)
  async phones(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllPhonesInput, nullable: true })
    where: WhereDataFindAllPhonesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPhonesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPhonesInput
  ) {
    return await this.findAllPhonesService.execute({
      page,
      where,
      orderBy
    });
  }
}
