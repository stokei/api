import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemovePaymentsMethodInput } from '@/controllers/graphql/inputs/payments-methods/remove-payments-method.input';
import { PaymentsMethod } from '@/controllers/graphql/types/payments-method';
import { RemovePaymentsMethodService } from '@/services/payments-methods/remove-payments-method';

@Resolver(() => PaymentsMethod)
export class RemovePaymentsMethodResolver {
  constructor(
    private readonly removePaymentsMethodService: RemovePaymentsMethodService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => PaymentsMethod)
  async removePaymentsMethod(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemovePaymentsMethodInput
  ) {
    const response = await this.removePaymentsMethodService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
