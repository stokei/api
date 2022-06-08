import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllAccessesInput,
  WhereDataFindAllAccessesInput
} from '@/controllers/graphql/inputs/accesses/find-all-accesses.input';
import { Access } from '@/controllers/graphql/types/access';
import { Accesses } from '@/controllers/graphql/types/accesses';
import { FindAllAccessesService } from '@/services/accesses/find-all-accesses';

@Resolver(() => Access)
export class AccessesResolver {
  constructor(
    private readonly findAllAccessesService: FindAllAccessesService
  ) {}

  @Query(() => Accesses)
  async accesses(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllAccessesInput,
      nullable: true
    })
    where: WhereDataFindAllAccessesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllAccessesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllAccessesInput
  ) {
    return await this.findAllAccessesService.execute({
      page,
      where,
      orderBy
    });
  }
}
