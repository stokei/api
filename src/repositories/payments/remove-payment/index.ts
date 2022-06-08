import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemovePaymentDTO } from '@/dtos/payments/remove-payment.dto';

@Injectable()
export class RemovePaymentRepository
  implements IBaseRepository<RemovePaymentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemovePaymentDTO): Promise<boolean> {
    const removed = await this.model.payment.delete({
      where: {
        id: where?.paymentId
      }
    });
    return !!removed;
  }
}
