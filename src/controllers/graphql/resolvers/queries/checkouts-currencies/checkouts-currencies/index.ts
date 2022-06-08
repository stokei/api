import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllCheckoutsCurrenciesInput,
  WhereDataFindAllCheckoutsCurrenciesInput
} from '@/controllers/graphql/inputs/checkouts-currencies/find-all-checkouts-currencies.input';
import { CheckoutsCurrency } from '@/controllers/graphql/types/checkouts-currency';
import { CheckoutsCurrencies } from '@/controllers/graphql/types/checkouts-currencies';
import { FindAllCheckoutsCurrenciesService } from '@/services/checkouts-currencies/find-all-checkouts-currencies';

@Resolver(() => CheckoutsCurrency)
export class CheckoutsCurrenciesResolver {
  constructor(
    private readonly findAllCheckoutsCurrenciesService: FindAllCheckoutsCurrenciesService
  ) {}

  @Query(() => CheckoutsCurrencies)
  async checkoutsCurrencies(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCheckoutsCurrenciesInput,
      nullable: true
    })
    where: WhereDataFindAllCheckoutsCurrenciesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCheckoutsCurrenciesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCheckoutsCurrenciesInput
  ) {
    return await this.findAllCheckoutsCurrenciesService.execute({
      page,
      where,
      orderBy
    });
  }
}
