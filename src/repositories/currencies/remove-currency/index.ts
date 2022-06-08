import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveCurrencyDTO } from '@/dtos/currencies/remove-currency.dto';

@Injectable()
export class RemoveCurrencyRepository
  implements IBaseRepository<RemoveCurrencyDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCurrencyDTO): Promise<boolean> {
    const removed = await this.model.currency.delete({
      where: {
        id: where?.currencyId
      }
    });
    return !!removed;
  }
}
