import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePaymentsMethodDTO } from '@/dtos/payments-methods/create-payments-method.dto';
import { PaymentsMethodMapper } from '@/mappers/payments-methods';
import { PaymentsMethodModel } from '@/models/payments-method.model';

@Injectable()
export class CreatePaymentsMethodRepository
  implements
    IBaseRepository<CreatePaymentsMethodDTO, Promise<PaymentsMethodModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePaymentsMethodDTO): Promise<PaymentsMethodModel> {
    return new PaymentsMethodMapper().toModel(
      await this.model.paymentsMethod.create({ data })
    );
  }
}
