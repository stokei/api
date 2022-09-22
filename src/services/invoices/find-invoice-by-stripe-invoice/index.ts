import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { InvoiceModel } from '@/models/invoice.model';
import { FindInvoiceByStripeInvoiceQuery } from '@/queries/implements/invoices/find-invoice-by-stripe-invoice.query';

@Injectable()
export class FindInvoiceByStripeInvoiceService
  implements IBaseService<string, Promise<InvoiceModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<InvoiceModel> {
    return await this.queryBus.execute(
      new FindInvoiceByStripeInvoiceQuery(data)
    );
  }
}
