import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveProductDTO } from '@/dtos/products/remove-product.dto';

@Injectable()
export class RemoveProductRepository
  implements IBaseRepository<RemoveProductDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveProductDTO): Promise<boolean> {
    const removed = await this.model.product.delete({
      where: {
        id: where?.productId
      }
    });
    return !!removed;
  }
}
