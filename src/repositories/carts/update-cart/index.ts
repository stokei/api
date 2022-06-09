import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateCartDTO } from '@/dtos/carts/update-cart.dto';

@Injectable()
export class UpdateCartRepository
  implements IBaseRepository<UpdateCartDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCartDTO): Promise<boolean> {
    const updated = await this.model.cart.update({
      where: {
        id: where?.cartId
      },
      data
    });
    return !!updated;
  }
}
