import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdatePaymentsMethodInput } from '@/controllers/graphql/inputs/payments-methods/update-payments-method.input';
import { PaymentsMethod } from '@/controllers/graphql/types/payments-method';
import { UpdatePaymentsMethodService } from '@/services/payments-methods/update-payments-method';

@Resolver(() => PaymentsMethod)
export class UpdatePaymentsMethodResolver {
  constructor(
    private readonly updatePaymentsMethodService: UpdatePaymentsMethodService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => PaymentsMethod)
  async updatePaymentsMethod(
    @Args('input') data: UpdatePaymentsMethodInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updatePaymentsMethodService.execute(data);
    return response;
  }
}
