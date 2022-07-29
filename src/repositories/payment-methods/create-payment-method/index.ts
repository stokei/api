import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePaymentMethodRepositoryDTO } from '@/dtos/payment-methods/create-payment-method-repository.dto';
import { PaymentMethodMapper } from '@/mappers/payment-methods';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodRepository
  implements
    IBaseRepository<
      CreatePaymentMethodRepositoryDTO,
      Promise<PaymentMethodModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreatePaymentMethodRepositoryDTO
  ): Promise<PaymentMethodModel> {
    return new PaymentMethodMapper().toModel(
      await this.model.paymentMethod.create({ data })
    );
  }
}
