import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllCartsInput,
  WhereDataFindAllCartsInput
} from '@/controllers/graphql/inputs/carts/find-all-carts.input';
import { Cart } from '@/controllers/graphql/types/cart';
import { Carts } from '@/controllers/graphql/types/carts';
import { FindAllCartsService } from '@/services/carts/find-all-carts';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly findAllCartsService: FindAllCartsService) {}

  @Query(() => Carts)
  async carts(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllCartsInput, nullable: true })
    where: WhereDataFindAllCartsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCartsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCartsInput
  ) {
    return await this.findAllCartsService.execute({
      page,
      where,
      orderBy
    });
  }
}
