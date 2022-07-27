import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemovePaymentMethodDTO } from '@/dtos/payment-methods/remove-payment-method.dto';

@Injectable()
export class RemovePaymentMethodRepository
  implements IBaseRepository<RemovePaymentMethodDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemovePaymentMethodDTO): Promise<boolean> {
    const removed = await this.model.paymentMethod.delete({
      where: {
        id: where?.paymentMethod
      }
    });
    return !!removed;
  }
}
