import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveCheckoutsCurrencyDTO } from '@/dtos/checkouts-currencies/remove-checkouts-currency.dto';

@Injectable()
export class RemoveCheckoutsCurrencyRepository
  implements IBaseRepository<RemoveCheckoutsCurrencyDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCheckoutsCurrencyDTO): Promise<boolean> {
    const removed = await this.model.checkoutsCurrency.delete({
      where: {
        id: where?.checkoutsCurrencyId
      }
    });
    return !!removed;
  }
}
