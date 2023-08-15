import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllPaymentsInput,
  WhereDataFindAllPaymentsInput
} from '@/controllers/graphql/inputs/payments/find-all-payments.input';
import { Payment } from '@/controllers/graphql/types/payment';
import { Payments } from '@/controllers/graphql/types/payments';
import { FindAllPaymentsService } from '@/services/payments/find-all-payments';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(
    private readonly findAllPaymentsService: FindAllPaymentsService
  ) {}

  @Query(() => Payments)
  async payments(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllPaymentsInput,
      nullable: true
    })
    where: WhereDataFindAllPaymentsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPaymentsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPaymentsInput
  ) {
    return await this.findAllPaymentsService.execute({
      page,
      where,
      orderBy
    });
  }
}
