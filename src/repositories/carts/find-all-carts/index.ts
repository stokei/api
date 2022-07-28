import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCartsDTO } from '@/dtos/carts/find-all-carts.dto';
import { CartMapper } from '@/mappers/carts';
import { CartModel } from '@/models/cart.model';

@Injectable()
export class FindAllCartsRepository
  implements IBaseRepository<FindAllCartsDTO, Promise<CartModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCartsDTO): Promise<CartModel[]> {
    const cartMapper = new CartMapper();
    return cartMapper.toModels(
      await this.model.cart.findMany(cartMapper.toFindAllPrisma(data))
    );
  }
}
