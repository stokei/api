import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsPaymentMethodsDTO } from '@/dtos/payment-methods/exists-payment-methods.dto';

@Injectable()
export class ExistsPaymentMethodsRepository
  implements IBaseRepository<ExistsPaymentMethodsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsPaymentMethodsDTO): Promise<boolean> {
    return (await this.model.paymentMethod.count({ where })) > 0;
  }
}
