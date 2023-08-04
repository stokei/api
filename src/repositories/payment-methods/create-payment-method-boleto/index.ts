import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePaymentMethodBoletoRepositoryDTO } from '@/dtos/payment-methods/create-payment-method-boleto-repository.dto';
import { PaymentMethodMapper } from '@/mappers/payment-methods';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodBoletoRepository
  implements
    IBaseRepository<
      CreatePaymentMethodBoletoRepositoryDTO,
      Promise<PaymentMethodModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreatePaymentMethodBoletoRepositoryDTO
  ): Promise<PaymentMethodModel> {
    return new PaymentMethodMapper().toModel(
      await this.model.paymentMethod.create({ data })
    );
  }
}
