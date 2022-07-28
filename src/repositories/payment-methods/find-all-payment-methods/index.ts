import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllPaymentMethodsDTO } from '@/dtos/payment-methods/find-all-payment-methods.dto';
import { PaymentMethodMapper } from '@/mappers/payment-methods';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class FindAllPaymentMethodsRepository
  implements
    IBaseRepository<FindAllPaymentMethodsDTO, Promise<PaymentMethodModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllPaymentMethodsDTO): Promise<PaymentMethodModel[]> {
    const paymentMethodMapper = new PaymentMethodMapper();
    return paymentMethodMapper.toModels(
      await this.model.paymentMethod.findMany(
        paymentMethodMapper.toFindAllPrisma(data)
      )
    );
  }
}
