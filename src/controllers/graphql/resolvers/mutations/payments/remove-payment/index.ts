import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemovePaymentInput } from '@/controllers/graphql/inputs/payments/remove-payment.input';
import { Payment } from '@/controllers/graphql/types/payment';
import { RemovePaymentService } from '@/services/payments/remove-payment';

@Resolver(() => Payment)
export class RemovePaymentResolver {
  constructor(private readonly removePaymentService: RemovePaymentService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Payment)
  async removePayment(
    @Args('input') data: RemovePaymentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removePaymentService.execute(data);
    return response;
  }
}
