import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdatePaymentDTO } from '@/dtos/payments/update-payment.dto';

@Injectable()
export class UpdatePaymentRepository
  implements IBaseRepository<UpdatePaymentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePaymentDTO): Promise<boolean> {
    const updated = await this.model.payment.update({
      where: {
        id: where?.paymentId
      },
      data
    });
    return !!updated;
  }
}
