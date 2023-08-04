import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePaymentMethodPixRepositoryDTO } from '@/dtos/payment-methods/create-payment-method-pix-repository.dto';
import { PaymentMethodMapper } from '@/mappers/payment-methods';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodPixRepository
  implements
    IBaseRepository<
      CreatePaymentMethodPixRepositoryDTO,
      Promise<PaymentMethodModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreatePaymentMethodPixRepositoryDTO
  ): Promise<PaymentMethodModel> {
    return new PaymentMethodMapper().toModel(
      await this.model.paymentMethod.create({ data })
    );
  }
}
