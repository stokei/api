import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCartsDTO } from '@/dtos/carts/count-carts.dto';
import { CartMapper } from '@/mappers/carts';

@Injectable()
export class CountCartsRepository
  implements IBaseRepository<CountCartsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCartsDTO): Promise<number> {
    const cartMapper = new CartMapper();
    return await this.model.cart.count({
      where: cartMapper.toWhereFindAllPrisma(where)
    });
  }
}
