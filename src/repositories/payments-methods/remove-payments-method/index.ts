import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemovePaymentsMethodDTO } from '@/dtos/payments-methods/remove-payments-method.dto';

@Injectable()
export class RemovePaymentsMethodRepository
  implements IBaseRepository<RemovePaymentsMethodDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemovePaymentsMethodDTO): Promise<boolean> {
    const removed = await this.model.paymentsMethod.delete({
      where: {
        id: where?.paymentsMethodId
      }
    });
    return !!removed;
  }
}
