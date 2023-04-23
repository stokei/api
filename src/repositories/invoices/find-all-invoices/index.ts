import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllInvoicesDTO } from '@/dtos/invoices/find-all-invoices.dto';
import { InvoiceMapper } from '@/mappers/invoices';
import { InvoiceModel } from '@/models/invoice.model';

@Injectable()
export class FindAllInvoicesRepository
  implements IBaseRepository<FindAllInvoicesDTO, Promise<InvoiceModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllInvoicesDTO): Promise<InvoiceModel[]> {
    const invoiceMapper = new InvoiceMapper();
    return invoiceMapper.toModels(
      await this.model.invoice.findMany(invoiceMapper.toFindAllPrisma(data))
    );
  }
}
