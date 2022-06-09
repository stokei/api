import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCheckoutsCurrencyDTO } from '@/dtos/checkouts-currencies/create-checkouts-currency.dto';
import { CheckoutsCurrencyMapper } from '@/mappers/checkouts-currencies';
import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';

@Injectable()
export class CreateCheckoutsCurrencyRepository
  implements
    IBaseRepository<
      CreateCheckoutsCurrencyDTO,
      Promise<CheckoutsCurrencyModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateCheckoutsCurrencyDTO
  ): Promise<CheckoutsCurrencyModel> {
    return new CheckoutsCurrencyMapper().toModel(
      await this.model.checkoutsCurrency.create({ data })
    );
  }
}
