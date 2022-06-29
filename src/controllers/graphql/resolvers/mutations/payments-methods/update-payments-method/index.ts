import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdatePaymentsMethodInput } from '@/controllers/graphql/inputs/payments-methods/update-payments-method.input';
import { PaymentsMethod } from '@/controllers/graphql/types/payments-method';
import { UpdatePaymentsMethodService } from '@/services/payments-methods/update-payments-method';

@Resolver(() => PaymentsMethod)
export class UpdatePaymentsMethodResolver {
  constructor(
    private readonly updatePaymentsMethodService: UpdatePaymentsMethodService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => PaymentsMethod)
  async updatePaymentsMethod(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdatePaymentsMethodInput
  ) {
    const response = await this.updatePaymentsMethodService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
