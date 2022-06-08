import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllOrdersSellersInput,
  WhereDataFindAllOrdersSellersInput
} from '@/controllers/graphql/inputs/orders-sellers/find-all-orders-sellers.input';
import { OrdersSeller } from '@/controllers/graphql/types/orders-seller';
import { OrdersSellers } from '@/controllers/graphql/types/orders-sellers';
import { FindAllOrdersSellersService } from '@/services/orders-sellers/find-all-orders-sellers';

@Resolver(() => OrdersSeller)
export class OrdersSellersResolver {
  constructor(
    private readonly findAllOrdersSellersService: FindAllOrdersSellersService
  ) {}

  @Query(() => OrdersSellers)
  async ordersSellers(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllOrdersSellersInput,
      nullable: true
    })
    where: WhereDataFindAllOrdersSellersInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllOrdersSellersInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllOrdersSellersInput
  ) {
    return await this.findAllOrdersSellersService.execute({
      page,
      where,
      orderBy
    });
  }
}
