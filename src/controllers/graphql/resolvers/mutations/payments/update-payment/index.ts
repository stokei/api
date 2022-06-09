import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdatePaymentInput } from '@/controllers/graphql/inputs/payments/update-payment.input';
import { Payment } from '@/controllers/graphql/types/payment';
import { UpdatePaymentService } from '@/services/payments/update-payment';

@Resolver(() => Payment)
export class UpdatePaymentResolver {
  constructor(private readonly updatePaymentService: UpdatePaymentService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Payment)
  async updatePayment(
    @Args('input') data: UpdatePaymentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updatePaymentService.execute(data);
    return response;
  }
}
