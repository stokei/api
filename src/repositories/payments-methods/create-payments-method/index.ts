import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { PaymentsMethodMapper } from '@/mappers/payments-methods';
import { CreatePaymentsMethodDTO } from '@/dtos/payments-methods/create-payments-method.dto';
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
