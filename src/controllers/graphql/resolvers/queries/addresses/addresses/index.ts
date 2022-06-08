import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllAddressesInput,
  WhereDataFindAllAddressesInput
} from '@/controllers/graphql/inputs/addresses/find-all-addresses.input';
import { Address } from '@/controllers/graphql/types/address';
import { Addresses } from '@/controllers/graphql/types/addresses';
import { FindAllAddressesService } from '@/services/addresses/find-all-addresses';

@Resolver(() => Address)
export class AddressesResolver {
  constructor(
    private readonly findAllAddressesService: FindAllAddressesService
  ) {}

  @Query(() => Addresses)
  async addresses(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllAddressesInput,
      nullable: true
    })
    where: WhereDataFindAllAddressesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllAddressesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllAddressesInput
  ) {
    return await this.findAllAddressesService.execute({
      page,
      where,
      orderBy
    });
  }
}
