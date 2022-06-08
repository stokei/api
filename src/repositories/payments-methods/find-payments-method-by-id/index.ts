import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { PaymentsMethodMapper } from '@/mappers/payments-methods';
import { PaymentsMethodModel } from '@/models/payments-method.model';

@Injectable()
export class FindPaymentsMethodByIdRepository
  implements IBaseRepository<string, Promise<PaymentsMethodModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<PaymentsMethodModel> {
    return new PaymentsMethodMapper().toModel(
      await this.model.paymentsMethod.findUnique({
        where: { id }
      })
    );
  }
}
