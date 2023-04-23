import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ChangeInvoiceToPaidRepositoryDTO } from '@/dtos/invoices/change-invoice-to-paid-repository.dto';

@Injectable()
export class ChangeInvoiceToPaidRepository
  implements
    IBaseRepository<ChangeInvoiceToPaidRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: ChangeInvoiceToPaidRepositoryDTO): Promise<boolean> {
    const updated = await this.model.invoice.update({
      where: {
        id: where?.invoice
      },
      data
    });
    return !!updated;
  }
}
