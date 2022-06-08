import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveCartDTO } from '@/dtos/carts/remove-cart.dto';

@Injectable()
export class RemoveCartRepository
  implements IBaseRepository<RemoveCartDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCartDTO): Promise<boolean> {
    const removed = await this.model.cart.delete({
      where: {
        id: where?.cartId
      }
    });
    return !!removed;
  }
}
