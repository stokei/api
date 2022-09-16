import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountInvoicesDTO } from '@/dtos/invoices/count-invoices.dto';
import { InvoiceMapper } from '@/mappers/invoices';

@Injectable()
export class CountInvoicesRepository
  implements IBaseRepository<CountInvoicesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountInvoicesDTO): Promise<number> {
    const invoiceMapper = new InvoiceMapper();
    return await this.model.invoice.count({
      where: invoiceMapper.toWhereFindAllPrisma(where)
    });
  }
}
