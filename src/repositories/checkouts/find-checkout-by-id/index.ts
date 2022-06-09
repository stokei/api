import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CheckoutMapper } from '@/mappers/checkouts';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class FindCheckoutByIdRepository
  implements IBaseRepository<string, Promise<CheckoutModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CheckoutModel> {
    return new CheckoutMapper().toModel(
      await this.model.checkout.findUnique({
        where: { id }
      })
    );
  }
}
