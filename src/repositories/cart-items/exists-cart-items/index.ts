import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCartItemsDTO } from '@/dtos/cart-items/exists-cart-items.dto';

@Injectable()
export class ExistsCartItemsRepository
  implements IBaseRepository<ExistsCartItemsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCartItemsDTO): Promise<boolean> {
    return (await this.model.cartItem.count({ where })) > 0;
  }
}
