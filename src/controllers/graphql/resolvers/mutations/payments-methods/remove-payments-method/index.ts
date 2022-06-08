import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemovePaymentsMethodInput } from '@/controllers/graphql/inputs/payments-methods/remove-payments-method.input';
import { PaymentsMethod } from '@/controllers/graphql/types/payments-method';
import { RemovePaymentsMethodService } from '@/services/payments-methods/remove-payments-method';

@Resolver(() => PaymentsMethod)
export class RemovePaymentsMethodResolver {
  constructor(
    private readonly removePaymentsMethodService: RemovePaymentsMethodService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => PaymentsMethod)
  async removePaymentsMethod(
    @Args('input') data: RemovePaymentsMethodInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removePaymentsMethodService.execute(data);
    return response;
  }
}
