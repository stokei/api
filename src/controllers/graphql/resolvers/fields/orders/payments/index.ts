import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllPaymentsInput } from '@/controllers/graphql/inputs/payments/find-all-payments.input';
import { Order } from '@/controllers/graphql/types/order';
import { Payments } from '@/controllers/graphql/types/payments';
import { OrderModel } from '@/models/order.model';
import { FindAllPaymentsService } from '@/services/payments/find-all-payments';

@Resolver(() => Order)
export class OrderPaymentsResolver {
  constructor(
    private readonly findAllPaymentsService: FindAllPaymentsService
  ) {}

  @ResolveField(() => Payments, { nullable: true })
  payments(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPaymentsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPaymentsInput,
    @Parent() order: OrderModel
  ) {
    return this.findAllPaymentsService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: order.id
          }
        }
      }
    });
  }
}
