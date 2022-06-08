import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllOrdersAddressesInput,
  WhereDataFindAllOrdersAddressesInput
} from '@/controllers/graphql/inputs/orders-addresses/find-all-orders-addresses.input';
import { OrdersAddress } from '@/controllers/graphql/types/orders-address';
import { OrdersAddresses } from '@/controllers/graphql/types/orders-addresses';
import { FindAllOrdersAddressesService } from '@/services/orders-addresses/find-all-orders-addresses';

@Resolver(() => OrdersAddress)
export class OrdersAddressesResolver {
  constructor(
    private readonly findAllOrdersAddressesService: FindAllOrdersAddressesService
  ) {}

  @Query(() => OrdersAddresses)
  async ordersAddresses(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllOrdersAddressesInput,
      nullable: true
    })
    where: WhereDataFindAllOrdersAddressesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllOrdersAddressesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllOrdersAddressesInput
  ) {
    return await this.findAllOrdersAddressesService.execute({
      page,
      where,
      orderBy
    });
  }
}
