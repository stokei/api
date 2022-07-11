import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllPaymentMethodsInput,
  WhereDataFindAllPaymentMethodsInput
} from '@/controllers/graphql/inputs/payment-methods/find-all-payment-methods.input';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { PaymentMethods } from '@/controllers/graphql/types/payment-methods';
import { FindAllPaymentMethodsService } from '@/services/payment-methods/find-all-payment-methods';

@Resolver(() => PaymentMethod)
export class PaymentMethodsResolver {
  constructor(
    private readonly findAllPaymentMethodsService: FindAllPaymentMethodsService
  ) {}

  @Query(() => PaymentMethods)
  async paymentMethods(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllPaymentMethodsInput,
      nullable: true
    })
    where: WhereDataFindAllPaymentMethodsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPaymentMethodsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPaymentMethodsInput
  ) {
    return await this.findAllPaymentMethodsService.execute({
      page,
      where,
      orderBy
    });
  }
}
