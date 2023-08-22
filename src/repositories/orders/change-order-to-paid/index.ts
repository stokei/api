import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ChangeOrderToPaidRepositoryDTO } from '@/dtos/orders/change-order-to-paid-repository.dto';

@Injectable()
export class ChangeOrderToPaidRepository
  implements IBaseRepository<ChangeOrderToPaidRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: ChangeOrderToPaidRepositoryDTO): Promise<boolean> {
    const updated = await this.model.order.update({
      where: {
        id: where?.order
      },
      data: {
        ...data,
        ...(data?.paidAmount && {
          paidAmount: {
            increment: data?.paidAmount
          }
        }),
        ...(data?.feeAmount && {
          feeAmount: {
            increment: data?.feeAmount
          }
        })
      }
    });
    return !!updated;
  }
}
