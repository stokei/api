import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CartMapper } from '@/mappers/carts';
import { CartModel } from '@/models/cart.model';

@Injectable()
export class FindCartByIdRepository
  implements IBaseRepository<string, Promise<CartModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CartModel> {
    return new CartMapper().toModel(
      await this.model.cart.findUnique({
        where: { id }
      })
    );
  }
}
