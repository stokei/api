import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  InvoiceNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { InvoiceModel } from '@/models/invoice.model';
import { FindInvoiceByIdQuery } from '@/queries/implements/invoices/find-invoice-by-id.query';
import { FindInvoiceByIdRepository } from '@/repositories/invoices/find-invoice-by-id';

@QueryHandler(FindInvoiceByIdQuery)
export class FindInvoiceByIdQueryHandler
  implements IQueryHandler<FindInvoiceByIdQuery>
{
  constructor(
    private readonly findInvoiceByIdRepository: FindInvoiceByIdRepository
  ) {}

  async execute(query: FindInvoiceByIdQuery): Promise<InvoiceModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const invoice = await this.findInvoiceByIdRepository.execute(id);
    if (!invoice) {
      throw new InvoiceNotFoundException();
    }
    return invoice;
  }
}
