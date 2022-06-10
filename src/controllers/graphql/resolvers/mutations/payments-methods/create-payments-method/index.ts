import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreatePaymentsMethodInput } from '@/controllers/graphql/inputs/payments-methods/create-payments-method.input';
import { PaymentsMethod } from '@/controllers/graphql/types/payments-method';
import { CreatePaymentsMethodService } from '@/services/payments-methods/create-payments-method';

@Resolver(() => PaymentsMethod)
export class CreatePaymentsMethodResolver {
  constructor(
    private readonly createPaymentsMethodService: CreatePaymentsMethodService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => PaymentsMethod)
  async createPaymentsMethod(@Args('input') data: CreatePaymentsMethodInput) {
    const response = await this.createPaymentsMethodService.execute(data);
    return response;
  }
}
