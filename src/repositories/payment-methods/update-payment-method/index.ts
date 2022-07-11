import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdatePaymentMethodDTO } from '@/dtos/payment-methods/update-payment-method.dto';

@Injectable()
export class UpdatePaymentMethodRepository
  implements IBaseRepository<UpdatePaymentMethodDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePaymentMethodDTO): Promise<boolean> {
    const updated = await this.model.paymentMethod.update({
      where: {
        id: where?.paymentMethodId
      },
      data
    });
    return !!updated;
  }
}
