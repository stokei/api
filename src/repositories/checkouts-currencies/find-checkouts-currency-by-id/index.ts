import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { CheckoutsCurrencyMapper } from '@/mappers/checkouts-currencies';
import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';

@Injectable()
export class FindCheckoutsCurrencyByIdRepository
  implements IBaseRepository<string, Promise<CheckoutsCurrencyModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CheckoutsCurrencyModel> {
    return new CheckoutsCurrencyMapper().toModel(
      await this.model.checkoutsCurrency.findUnique({
        where: { id }
      })
    );
  }
}
