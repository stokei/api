import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { Cart } from '@/controllers/graphql/types/cart';
import { CreateCartService } from '@/services/carts/create-cart';

@Resolver(() => Cart)
export class CreateCartResolver {
  constructor(private readonly createCartService: CreateCartService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Cart)
  async createCart(@CurrentAccount('id') currentAccountId: string) {
    const response = await this.createCartService.execute({
      createdBy: currentAccountId
    });
    return response;
  }
}
