import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { InvoiceMapper } from '@/mappers/invoices';
import { InvoiceModel } from '@/models/invoice.model';

@Injectable()
export class FindInvoiceByStripeInvoiceRepository
  implements IBaseRepository<string, Promise<InvoiceModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(stripeInvoice: string): Promise<InvoiceModel> {
    return new InvoiceMapper().toModel(
      await this.model.invoice.findFirst({
        where: { stripeInvoice }
      })
    );
  }
}
