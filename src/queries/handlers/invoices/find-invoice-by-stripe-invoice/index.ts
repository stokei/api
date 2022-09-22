import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  InvoiceNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { InvoiceModel } from '@/models/invoice.model';
import { FindInvoiceByStripeInvoiceQuery } from '@/queries/implements/invoices/find-invoice-by-stripe-invoice.query';
import { FindInvoiceByStripeInvoiceRepository } from '@/repositories/invoices/find-invoice-by-stripe-invoice';

@QueryHandler(FindInvoiceByStripeInvoiceQuery)
export class FindInvoiceByStripeInvoiceQueryHandler
  implements IQueryHandler<FindInvoiceByStripeInvoiceQuery>
{
  constructor(
    private readonly findInvoiceByStripeInvoiceRepository: FindInvoiceByStripeInvoiceRepository
  ) {}

  async execute(query: FindInvoiceByStripeInvoiceQuery): Promise<InvoiceModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const stripeInvoice = cleanValue(query.stripeInvoice);
    if (!stripeInvoice) {
      throw new ParamNotFoundException('stripeInvoice');
    }

    const invoice = await this.findInvoiceByStripeInvoiceRepository.execute(
      stripeInvoice
    );
    if (!invoice) {
      throw new InvoiceNotFoundException();
    }
    return invoice;
  }
}
