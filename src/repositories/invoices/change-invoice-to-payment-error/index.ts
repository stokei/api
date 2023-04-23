import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ChangeInvoiceToPaymentErrorRepositoryDTO } from '@/dtos/invoices/change-invoice-to-payment-error-repository.dto';

@Injectable()
export class ChangeInvoiceToPaymentErrorRepository
  implements
    IBaseRepository<ChangeInvoiceToPaymentErrorRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: ChangeInvoiceToPaymentErrorRepositoryDTO): Promise<boolean> {
    const updated = await this.model.invoice.update({
      where: {
        id: where?.invoice
      },
      data
    });
    return !!updated;
  }
}
