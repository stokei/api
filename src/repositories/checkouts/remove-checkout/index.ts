import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCheckoutDTO } from '@/dtos/checkouts/remove-checkout.dto';

@Injectable()
export class RemoveCheckoutRepository
  implements IBaseRepository<RemoveCheckoutDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCheckoutDTO): Promise<boolean> {
    const removed = await this.model.checkout.delete({
      where: {
        id: where?.checkoutId
      }
    });
    return !!removed;
  }
}
