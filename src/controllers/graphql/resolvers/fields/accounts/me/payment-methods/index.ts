import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllPaymentMethodsInput } from '@/controllers/graphql/inputs/payment-methods/find-all-payment-methods.input';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { PaymentMethods } from '@/controllers/graphql/types/payment-methods';
import { AccountModel } from '@/models/account.model';
import { FindAllPaymentMethodsService } from '@/services/payment-methods/find-all-payment-methods';

@Resolver(() => MeAccount)
export class MeAccountPaymentMethodsResolver {
  constructor(
    private readonly findAllPaymentMethodsService: FindAllPaymentMethodsService
  ) {}

  @ResolveField(() => PaymentMethods, { nullable: true })
  paymentMethods(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPaymentMethodsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPaymentMethodsInput,
    @Parent() account: AccountModel
  ) {
    return this.findAllPaymentMethodsService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: account.id
          }
        }
      }
    });
  }
}
