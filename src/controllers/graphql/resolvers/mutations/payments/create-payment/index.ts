import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreatePaymentInput } from '@/controllers/graphql/inputs/payments/create-payment.input';
import { Payment } from '@/controllers/graphql/types/payment';
import { CreatePaymentService } from '@/services/payments/create-payment';

@Resolver(() => Payment)
export class CreatePaymentResolver {
  constructor(private readonly createPaymentService: CreatePaymentService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Payment)
  async createPayment(
    @Args('input') data: CreatePaymentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createPaymentService.execute(data);
    return response;
  }
}
