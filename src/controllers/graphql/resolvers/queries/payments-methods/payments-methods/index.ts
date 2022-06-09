import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllPaymentsMethodsInput,
  WhereDataFindAllPaymentsMethodsInput
} from '@/controllers/graphql/inputs/payments-methods/find-all-payments-methods.input';
import { PaymentsMethod } from '@/controllers/graphql/types/payments-method';
import { PaymentsMethods } from '@/controllers/graphql/types/payments-methods';
import { FindAllPaymentsMethodsService } from '@/services/payments-methods/find-all-payments-methods';

@Resolver(() => PaymentsMethod)
export class PaymentsMethodsResolver {
  constructor(
    private readonly findAllPaymentsMethodsService: FindAllPaymentsMethodsService
  ) {}

  @Query(() => PaymentsMethods)
  async paymentsMethods(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllPaymentsMethodsInput,
      nullable: true
    })
    where: WhereDataFindAllPaymentsMethodsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPaymentsMethodsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPaymentsMethodsInput
  ) {
    return await this.findAllPaymentsMethodsService.execute({
      page,
      where,
      orderBy
    });
  }
}
