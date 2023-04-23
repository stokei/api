import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ChangeInvoiceToPaymentErrorCommand } from '@/commands/implements/invoices/change-invoice-to-payment-error.command';
import { ChangeInvoiceToPaymentErrorDTO } from '@/dtos/invoices/change-invoice-to-payment-error.dto';
import { InvoiceModel } from '@/models/invoice.model';

@Injectable()
export class ChangeInvoiceToPaymentErrorService
  implements
    IBaseService<ChangeInvoiceToPaymentErrorDTO, Promise<InvoiceModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ChangeInvoiceToPaymentErrorDTO): Promise<InvoiceModel> {
    return await this.commandBus.execute(
      new ChangeInvoiceToPaymentErrorCommand(data)
    );
  }
}
